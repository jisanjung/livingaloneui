import { API_PATHS, DUMMY_BALANCE } from "./constants";
import { currencyStringToFloat } from "./utils";

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

export const updateExpense = async (currentExpenseName: string, expenseInput: string) => {
    if (import.meta.env.DEV) {
        dummyBalance -= currencyStringToFloat(expenseInput);
        return true;
    }

    const updateExpenseUrl = `${import.meta.env.VITE_LIVING_ALONE_API_BASE_PATH + API_PATHS.updateExpense}/${currentExpenseName}`;
    const response = await fetch(updateExpenseUrl, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ new_expense: currencyStringToFloat(expenseInput) }),
    });
    const data = await response.json();

    return data.success;
};
