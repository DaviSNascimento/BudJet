import { Client } from './client'

export type BudgetInput = {
    title: string;
    description?: string;
    client?: Client;
}

export type BudgetResult = {
    budget_id: string;
}

export type BudgetItemsInput = {
    budget_id: string;
    description: string;
    quantity: number;
    unit_price: string;
}


export type BudgetItemsResult = {
    budget_items_id: string;
}

export type RecalculateBudgetTotalsResult = {
    subtotal: number;
    total: number;
};

type UpdateBudgetItemInput = {
  item_id: string;
  description?: string;
  quantity?: number;
  unit_price?: string;
};