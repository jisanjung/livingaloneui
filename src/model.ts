import { Action, action, Thunk, thunk, createTypedHooks } from "easy-peasy";
import { EXPENSE_NAMES } from "./constants";
import { Purchase } from "./storage";
import { fetchPurchases, getBalance, spend } from "./api";

// refer here to how to structure easy-peasy store using TS:
// https://github.com/ctrlplusb/easy-peasy-typescript/tree/master/src/model

// interfaces
interface ExpenseModel {
    current: string;
    input: Action<ExpenseModel, number>;
    delete: Action<ExpenseModel, null>;
    clear: Action<ExpenseModel, null>;
};
interface ExpenseNameModel {
    current: string;
    change: Action<ExpenseNameModel, string>
};
// 'idle' and 'loading' render the shimmer; 'loaded' and 'error' render the value.
type BalanceStatus = 'idle' | 'loading' | 'loaded' | 'error';
interface BalanceModel {
    current: string;
    status: BalanceStatus;
    update: Action<BalanceModel, string>;
    setStatus: Action<BalanceModel, BalanceStatus>;
    load: Thunk<BalanceModel, { force?: boolean } | undefined, undefined, GlobalStateModel, Promise<void>>;
};
export interface SpendOutcome {
    ok: boolean;
    historySaved: boolean;
};
interface PurchasesModel {
    items: Purchase[];
    loading: boolean;
    loaded: boolean;
    error: string;
    setAll: Action<PurchasesModel, Purchase[]>;
    add: Action<PurchasesModel, Purchase>;
    setLoading: Action<PurchasesModel, boolean>;
    setLoaded: Action<PurchasesModel, boolean>;
    setError: Action<PurchasesModel, string>;
    load: Thunk<PurchasesModel, { force?: boolean } | undefined, undefined, GlobalStateModel, Promise<void>>;
    spend: Thunk<PurchasesModel, { expenseName: string; purchase: Purchase }, undefined, GlobalStateModel, Promise<SpendOutcome>>;
};

// In-flight requests, shared so a double mount (StrictMode, quick back/forward)
// joins the pending request instead of firing a duplicate.
let balanceRequest: Promise<void> | null = null;
let purchasesRequest: Promise<void> | null = null;

export interface GlobalStateModel {
    expense: ExpenseModel;
    expenseName: ExpenseNameModel;
    balance: BalanceModel;
    purchases: PurchasesModel;
};

// state declarations
const expense: ExpenseModel = {
    current: '',
    // Whole dollars, capped at six digits ($999,999) so the display never
    // overflows, and no leading zeros.
    input: action((state, payload) => {
        if (state.current.length >= 6 || (!state.current && payload === 0)) {
            return;
        }
        state.current += payload;
    }),
    delete: action((state) => {
        if (!state.current || state.current.length === 0) {
            return;
        }
        const trimmed = state.current.slice(0, -1);
        state.current = trimmed;
    }),
    clear: action((state) => {
        state.current = '';
    }),
};
const expenseName: ExpenseNameModel = {
    current: EXPENSE_NAMES.ACCUMULATED_SPENDING,
    change: action((state, payload) => {
        state.current = payload;
    }),
};
const balance: BalanceModel = {
    current: '0',
    status: 'idle',
    update: action((state, payload) => {
        state.current = payload;
    }),
    setStatus: action((state, payload) => {
        state.status = payload;
    }),
    // Fetched once per session. Saves update it from the /spend response, so
    // coming back from History doesn't need to refetch. `force` refreshes in
    // the background without bringing the shimmer back.
    load: thunk(async (actions, payload, { getState }) => {
        const { status } = getState();
        if (status === 'loaded' && !payload?.force) {
            return;
        }
        if (!balanceRequest) {
            if (status !== 'loaded') {
                actions.setStatus('loading');
            }
            balanceRequest = getBalance()
                .then(value => {
                    if (value) {
                        actions.update(value);
                    }
                    actions.setStatus('loaded');
                })
                .catch(err => {
                    console.log('COULD_NOT_LOAD_BALANCE: ', err);
                    if (getState().status !== 'loaded') {
                        actions.setStatus('error');
                    }
                })
                .finally(() => {
                    balanceRequest = null;
                });
        }
        return balanceRequest;
    }),
};
const purchases: PurchasesModel = {
    items: [],
    loading: false,
    loaded: false,
    error: '',
    setAll: action((state, payload) => {
        state.items = payload;
    }),
    add: action((state, payload) => {
        state.items.push(payload);
    }),
    setLoading: action((state, payload) => {
        state.loading = payload;
    }),
    setLoaded: action((state, payload) => {
        state.loaded = payload;
    }),
    setError: action((state, payload) => {
        state.error = payload;
    }),
    // Fetched on the first History visit only. New purchases are appended
    // as they're saved, so later visits render from the store with no request.
    load: thunk(async (actions, payload, { getState }) => {
        if (getState().loaded && !payload?.force) {
            return;
        }
        if (!purchasesRequest) {
            actions.setLoading(true);
            actions.setError('');
            purchasesRequest = fetchPurchases()
                .then(items => {
                    actions.setAll(items);
                    actions.setLoaded(true);
                })
                .catch(err => {
                    console.log('COULD_NOT_LOAD_PURCHASES: ', err);
                    actions.setError('Could not load your purchases.');
                })
                .finally(() => {
                    actions.setLoading(false);
                    purchasesRequest = null;
                });
        }
        return purchasesRequest;
    }),
    // Records the expense, saves it to history and refreshes the balance in a
    // single request. Stores the row the server hands back rather than the one
    // we sent, so the UI holds the canonical record (database id, normalized amount).
    spend: thunk(async (actions, { expenseName, purchase }, { getStoreActions }) => {
        const balanceActions = getStoreActions().balance;
        try {
            const result = await spend(expenseName, purchase);
            if (!result.ok) {
                return { ok: false, historySaved: false };
            }
            if (result.historySaved && result.purchase) {
                actions.add(result.purchase);
            } else {
                // The toast reports this; the History page's error state is
                // reserved for failed loads.
                console.log('COULD_NOT_SAVE_PURCHASE');
            }
            if (result.balance) {
                balanceActions.update(result.balance);
                balanceActions.setStatus('loaded');
            } else {
                // The server couldn't read the balance back; fetch it quietly.
                balanceActions.load({ force: true });
            }
            return { ok: true, historySaved: result.historySaved };
        } catch (err) {
            console.log('COULD_NOT_UPDATE_EXPENSE: ', err);
            return { ok: false, historySaved: false };
        }
    }),
};

const globalState = {
    expense,
    expenseName,
    balance,
    purchases,
};

const typedHooks = createTypedHooks<GlobalStateModel>();
export const useStoreState = typedHooks.useStoreState;
export const useStoreActions = typedHooks.useStoreActions;

export default globalState;
