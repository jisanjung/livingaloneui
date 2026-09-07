import { Action, action, Thunk, thunk, createTypedHooks } from "easy-peasy";
import { EXPENSE_NAMES } from "./constants";
import { Purchase } from "./storage";
import { createPurchase, fetchPurchases } from "./api";

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
interface PreConfirmModel {
    triggered: boolean;
    toggle: Action<PreConfirmModel, boolean>;
};
interface PostConfirmModel {
    triggered: boolean;
    toggle: Action<PostConfirmModel, boolean>;
};
interface BalanceModel {
    current: string;
    update: Action<BalanceModel, string>;
};
interface PurchasesModel {
    items: Purchase[];
    loading: boolean;
    error: string;
    setAll: Action<PurchasesModel, Purchase[]>;
    add: Action<PurchasesModel, Purchase>;
    setLoading: Action<PurchasesModel, boolean>;
    setError: Action<PurchasesModel, string>;
    load: Thunk<PurchasesModel>;
    save: Thunk<PurchasesModel, Purchase, undefined, GlobalStateModel, Promise<boolean>>;
};

export interface GlobalStateModel {
    expense: ExpenseModel;
    expenseName: ExpenseNameModel;
    preConfirm: PreConfirmModel;
    postConfirm: PostConfirmModel;
    balance: BalanceModel;
    purchases: PurchasesModel;
};

// state declarations
const expense: ExpenseModel = {
    current: '',
    input: action((state, payload) => {
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
const preConfirm: PreConfirmModel = {
    triggered: false,
    toggle: action((state, payload) => {
        state.triggered = payload;
    }),
};
const postConfirm: PostConfirmModel = {
    triggered: false,
    toggle: action((state, payload) => {
        state.triggered = payload;
    }),
};
const balance: BalanceModel = {
    current: '0',
    update: action((state, payload) => {
        state.current = payload;
    }),
};
const purchases: PurchasesModel = {
    items: [],
    loading: false,
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
    setError: action((state, payload) => {
        state.error = payload;
    }),
    load: thunk(async (actions) => {
        actions.setLoading(true);
        actions.setError('');
        try {
            actions.setAll(await fetchPurchases());
        } catch (err) {
            console.log('COULD_NOT_LOAD_PURCHASES: ', err);
            actions.setError('Could not load your purchases.');
        }
        actions.setLoading(false);
    }),
    // Store the record the server hands back rather than the one we sent, so
    // the UI holds the canonical row (database id, normalized amount).
    save: thunk(async (actions, payload) => {
        try {
            actions.add(await createPurchase(payload));
            return true;
        } catch (err) {
            console.log('COULD_NOT_SAVE_PURCHASE: ', err);
            actions.setError('Could not save that purchase.');
            return false;
        }
    }),
};

const globalState = {
    expense,
    expenseName,
    preConfirm,
    postConfirm,
    balance,
    purchases,
};

const typedHooks = createTypedHooks<GlobalStateModel>();
export const useStoreState = typedHooks.useStoreState;
export const useStoreActions = typedHooks.useStoreActions;

export default globalState;
