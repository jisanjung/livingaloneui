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

export const createPurchase = async (purchase: Purchase): Promise<Purchase> => {
    if (import.meta.env.DEV) {
        savePurchase(purchase);
        return purchase;
    }

    const purchasesUrl = import.meta.env.VITE_LIVING_ALONE_API_BASE_PATH + API_PATHS.purchases;
    const response = await fetch(purchasesUrl, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        // Send a plain number - the display string is comma-grouped and would
        // otherwise be truncated ("1,500" -> 1) on the way into the database.
        body: JSON.stringify({ ...purchase, amount: currencyStringToFloat(purchase.amount) }),
    });
    const data = await response.json();

    if (!data.success) {
        throw new Error(data.message || 'COULD_NOT_SAVE_PURCHASE');
    }
    return toPurchase(data.purchase);
};
