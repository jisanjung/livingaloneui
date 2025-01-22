import { createTypedHooks } from "easy-peasy";

export interface GlobalStateModel {};

const globalState = {
    // state
};

const typedHooks = createTypedHooks<GlobalStateModel>();
export const useStoreState = typedHooks.useStoreState;
export const useStoreActions = typedHooks.useStoreActions;

export default globalState;
