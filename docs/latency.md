# Latency improvements (UI)

Companion to the server change in `livingaloneserver` (`docs/latency.md` there).
The UI looks the same and shows the same toasts. Only the network behavior changed.

## Problem

| Flow | Requests before |
|---|---|
| Open `/` | `GET /balance/total_savings` |
| Save a purchase | `POST /expense/update/:name` → `POST /purchases` → `GET /balance/total_savings` (sequential, each JSON POST also preflighted) |
| Open `/history` | `GET /purchases` on **every** visit, with the shimmer every time |
| Back to `/` | `GET /balance/total_savings` **again**, because `Balance` remounts |

## Changes

### 1. One request per save (`src/api.ts`, `src/model.ts`, `ExpenseAppWrapper.tsx`)

- `api.spend(expenseName, purchase)` calls the new `POST /spend` endpoint (`API_PATHS.spend`). It returns `{ ok, historySaved, purchase?, balance? }`. In dev it uses the same dummy balance and localStorage stand-ins as before.
- The `purchases.spend` thunk replaces `purchases.save`:
  - adds the server's canonical row to the store when history saved
  - sets the balance from the response, or quietly refetches it if the server couldn't read it back
- `handleSave` makes one `await spend(...)` call and maps the result to the same three toasts:
  - success: `Spent $X 🍔`
  - expense recorded but history failed: `…but not saved to history`
  - failure: `Couldn't save. Try again.`
- Removed `updateExpense` and `createPurchase`. Nothing else used them.

### 2. Balance fetched once per session (`model.ts`, `Balance.tsx`)

- `balance.status` (`idle | loading | loaded | error`) replaces local component state. The shimmer shows only for `idle`/`loading`, so returning from History renders the cached value instantly.
- `balance.load()` no-ops once loaded. `load({ force: true })` refreshes in the background without bringing the shimmer back.
- If the first load fails, the balance shows `$0` as before, and the next mount retries.

### 3. History fetched on first visit only (`model.ts`, `PurchaseHistory.tsx`)

- `purchases.loaded` is set after a successful fetch. Later visits render from the store with no request.
- The cache stays correct because new purchases are appended to the store as they're saved.
- "Try again" calls `load({ force: true })`.
- A failed history *save* no longer sets `purchases.error`. That error used to appear briefly on History until the refetch cleared it. With caching it would stick, and the save toast already reports the failure.

### 4. Shared in-flight requests (`model.ts`)

Module-level `balanceRequest` / `purchasesRequest` promises mean a double
mount (React StrictMode, quick back/forward) joins the pending request instead
of firing a duplicate.

### 5. Preconnect to the API (`vite.config.ts`)

A small Vite plugin injects
`<link rel="preconnect" href="<api origin>" crossorigin>` into `index.html`
at build time, so DNS and TLS setup overlap the JS download. It uses only the
origin of `VITE_LIVING_ALONE_API_BASE_PATH` and is skipped when that variable
is unset.

## Result

| Flow | Before | After |
|---|---|---|
| Save a purchase | 3 requests + 2 preflights | 1 request (preflight cached by the server's `Access-Control-Max-Age`) |
| `/` ↔ `/history` after first load | 1 request per navigation | 0 |
| First request | Connection setup after JS boot | Connection already warm |

## Deploying

Deploy the server's `/spend` endpoint **first**. Until it exists, every save
shows "Couldn't save. Try again."

## Verifying

- `npm run build && npm run lint`
- `npm run dev` (dummy mode): saving decrements the balance, shows the success toast, and the purchase appears in History.
- Against the real API, in the DevTools Network tab:
  - one `/spend` per save
  - no request when going History → back → History
  - no `OPTIONS` on a second save shortly after the first
