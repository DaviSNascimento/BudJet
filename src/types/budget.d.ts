import { Client } from './client'

export type CreateBudgetInput = {
    title: string;
    description?: string;
    client?: Client;
    budget_items: BudgetItems;
}

export type CreateBudgetResult = {
    budgetId: string;
}