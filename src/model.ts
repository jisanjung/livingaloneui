import { Action, action, createTypedHooks } from "easy-peasy";

// refer here to how to structure easy-peasy store using TS:
// https://github.com/ctrlplusb/easy-peasy-typescript/tree/master/src/model

// interfaces
interface ExpenseModel {
    input: string;
    modify: Action<ExpenseModel, number>;
};

export interface GlobalStateModel {
    expense: ExpenseModel
};

// state declarations
const expense: ExpenseModel = {
    input: '',
    modify: action((state, payload) => {
        state.input += payload;
    }),
};

const globalState = {
    expense
};

const typedHooks = createTypedHooks<GlobalStateModel>();
export const useStoreState = typedHooks.useStoreState;
export const useStoreActions = typedHooks.useStoreActions;

export default globalState;
