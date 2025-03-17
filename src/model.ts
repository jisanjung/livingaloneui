import { Action, action, createTypedHooks } from "easy-peasy";
import { EXPENSE_NAMES } from "./constants";

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

export interface GlobalStateModel {
    expense: ExpenseModel;
    expenseName: ExpenseNameModel;
    preConfirm: PreConfirmModel;
    postConfirm: PostConfirmModel;
    balance: BalanceModel;
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

const globalState = {
    expense,
    expenseName,
    preConfirm,
    postConfirm,
    balance,
};

const typedHooks = createTypedHooks<GlobalStateModel>();
export const useStoreState = typedHooks.useStoreState;
export const useStoreActions = typedHooks.useStoreActions;

export default globalState;
