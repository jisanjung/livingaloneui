import { PURCHASE_STORAGE_KEY } from "./constants";

export interface Purchase {
    id: string;
    emoji: string;
    description: string;
    amount: string; // currency-formatted string e.g. "5.00"
    expenseName: string;
    date: string; // ISO string
};

// Persistence layer for purchase history.
// Backed by localStorage for now - swap these two functions for API calls
// once the backend supports purchase records.

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
