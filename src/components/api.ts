import { API_PATHS } from "../constants";
import { currencyStringToFloat } from "../utils";

export const getBalance = async () => {
    const totalSavingsApiUrl = import.meta.env.VITE_LIVING_ALONE_API_BASE_PATH + API_PATHS.balance;
    const response = await fetch(totalSavingsApiUrl);
    const data = await response.json();

    if (!data.success) {
        return;
    }
    return data.total_savings.toFixed(2);
};

export const updateExpense = async (currentExpenseName: string, expenseInput: string) => {
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
