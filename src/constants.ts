const expenseNamesMap: Record<string, string> = {
    'accumulated_spending': 'Spending',
    'groceries': 'Groceries',
    'gas': 'Gas',
};
export const EXPENSE_NAMES = {
    ACCUMULATED_SPENDING: 'accumulated_spending',
    GROCERIES: 'groceries',
    GAS: 'gas',
    map: expenseNamesMap,
};

export const API_PATHS = {
    balance: '/balance/total_savings',
    expense: '/expense',
    all: '/all',
    updateExpense: '/expense/update',
};
