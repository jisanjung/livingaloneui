import { Action, action, createTypedHooks } from "easy-peasy";
import { EXPENSE_NAMES } from "./constants";

// refer here to how to structure easy-peasy store using TS:
// https://github.com/ctrlplusb/easy-peasy-typescript/tree/master/src/model

// interfaces
interface ExpenseModel {
    input: string;
    modify: Action<ExpenseModel, number>;
};

interface ExpenseNameModel {
    current: string;
    change: Action<ExpenseNameModel, string>
}

export interface GlobalStateModel {
    expense: ExpenseModel;
    expenseName: ExpenseNameModel;
};

// state declarations
const expense: ExpenseModel = {
    input: '',
    modify: action((state, payload) => {
        state.input += payload;
    }),
};
const expenseName: ExpenseNameModel = {
    current: EXPENSE_NAMES.ACCUMULATED_SPENDING,
    change: action((state, payload) => {
        state.current = payload;
    }),
};

const globalState = {
    expense,
    expenseName,
};

const typedHooks = createTypedHooks<GlobalStateModel>();
export const useStoreState = typedHooks.useStoreState;
export const useStoreActions = typedHooks.useStoreActions;

export default globalState;
