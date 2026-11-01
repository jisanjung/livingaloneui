import { API_PATHS, DUMMY_BALANCE } from "./constants";
import { loadPurchases, savePurchase, Purchase } from "./storage";
import { currencyStringToFloat, formatCurrency } from "./utils";

// In dev/local mode, use an in-memory dummy balance instead of calling the API.
let dummyBalance = DUMMY_BALANCE;

export const getBalance = async () => {
    if (import.meta.env.DEV) {
        return dummyBalance.toFixed(2);
    }

    const totalSavingsApiUrl = import.meta.env.VITE_LIVING_ALONE_API_BASE_PATH + API_PATHS.balance;
    const response = await fetch(totalSavingsApiUrl);
    const data = await response.json();

    if (!data.success) {
        return;
    }
    return data.total_savings.toFixed(2);
};

// Purchases. In dev these fall back to localStorage (see storage.ts) so the app
// works without a running backend, matching the dummy balance above.

// The server stores amounts as numbers and returns them with 2 decimals
// ("1500.00"), while the UI displays grouped strings ("1,500"). Normalize
// incoming rows so both the dev and production paths render identically.
const toPurchase = (row: Purchase): Purchase => ({
    ...row,
    amount: formatCurrency(currencyStringToFloat(row.amount)),
});

export const fetchPurchases = async (): Promise<Purchase[]> => {
    if (import.meta.env.DEV) {
        return loadPurchases();
    }

    const purchasesUrl = import.meta.env.VITE_LIVING_ALONE_API_BASE_PATH + API_PATHS.purchases;
    const response = await fetch(purchasesUrl);
    const data = await response.json();

    if (!data.success) {
        throw new Error(data.message || 'COULD_NOT_FETCH_PURCHASES');
    }
    return data.purchases.map(toPurchase);
};

export interface SpendResult {
    // The expense was recorded. Nothing else happened when this is false.
    ok: boolean;
    // The purchase also made it into history (only attempted when ok).
    historySaved: boolean;
    // The canonical row the server stored, when historySaved.
    purchase?: Purchase;
    // The recalculated balance, when the server could read it back.
    balance?: string;
}

// One request records the expense, saves the purchase to history, and returns
// the new balance. It replaces three back-to-back calls (update expense,
// create purchase, refetch balance).
export const spend = async (expenseName: string, purchase: Purchase): Promise<SpendResult> => {
    if (import.meta.env.DEV) {
        dummyBalance -= currencyStringToFloat(purchase.amount);
        savePurchase(purchase);
        return { ok: true, historySaved: true, purchase, balance: dummyBalance.toFixed(2) };
    }

    const spendUrl = import.meta.env.VITE_LIVING_ALONE_API_BASE_PATH + API_PATHS.spend;
    const response = await fetch(spendUrl, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            expenseName,
            // Send a plain number - the display string is comma-grouped and would
            // otherwise be truncated ("1,500" -> 1) on the way into the database.
            purchase: { ...purchase, amount: currencyStringToFloat(purchase.amount) },
        }),
    });
    const data = await response.json();

    if (!data.success) {
        return { ok: false, historySaved: false };
    }
    return {
        ok: true,
        historySaved: Boolean(data.history_saved && data.purchase),
        purchase: data.purchase ? toPurchase(data.purchase) : undefined,
        balance: typeof data.total_savings === 'number' ? data.total_savings.toFixed(2) : undefined,
    };
};
