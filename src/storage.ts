import { PURCHASE_STORAGE_KEY } from "./constants";

export interface Purchase {
    id: string;
    emoji: string;
    description: string;
    amount: string; // currency-formatted string e.g. "5.00"
    expenseName: string;
    date: string; // ISO string
};

// Dev-mode backend for purchase history.
// In production the API is the source of truth (see api.ts); these keep
// `npm run dev` working offline with real persistence, the same way
// DUMMY_BALANCE stands in for the balance endpoint.

export const loadPurchases = (): Purchase[] => {
    try {
        const raw = localStorage.getItem(PURCHASE_STORAGE_KEY);
        if (!raw) {
            return [];
        }
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};

export const savePurchase = (purchase: Purchase): void => {
    const purchases = loadPurchases();
    purchases.push(purchase);
    localStorage.setItem(PURCHASE_STORAGE_KEY, JSON.stringify(purchases));
};
