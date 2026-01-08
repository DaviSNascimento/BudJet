import { BudgetInput, BudgetResult, BudgetItemsInput, BudgetItemsResult, RecalculateBudgetTotalsResult, UpdateBudgetItemInput } from "../types/budget";
import { createSupabaseServer } from "../lib/supabase/server";

export async function createBudget(input: BudgetInput
): Promise<BudgetResult> {

    // Autenticar
    const supabase = await createSupabaseServer();

    // validar o usuário
    const {
        data: { user },
        error: AuthError
    } = await supabase.auth.getUser()

    if (AuthError || !user) {
        throw new Error("Usuário não autenticado")
    }

    // validar budget
    if (!input.title || input.title.trim().length === 0) {
        throw new Error("Título do orçamento é obrigatório")
    }

    let client_id: string | null = null;

    // validar client
    if (input.client) {
        const { name, email, company } = input.client

        if (!name || name.trim().length === 0) {
            throw new Error("Nome do cliente é obrigatório quando informado")
        }

        // persistir ( inserindo client no banco)
        const { data: client, error: clientError } = await supabase
            .from("client")
            .insert({
                user_id: user.id,
                name,
                email,
                company,
            })
            .select("id")
            .single();

        if (!client || clientError) {
            throw new Error("Falha ao criar cliente");
        }

        client_id = client.id;
    }

    // persistir ( inserindo orçamento no banco)
    const { data: budget, error: budgetError } = await supabase
        .from("budget")
        .insert({
            user_id: user.id,
            client_id: client_id,
            title: input.title,
            description: input.description ?? null,
            subtotal: 0, // MVP inicia zerado - fazr logica depois
            total: 0,  // MVP inicia zerado - fazr logica depois
        })
        .select("id")
        .single()

    if (budgetError || !budget) {
        throw new Error("Falha ao criar orçamento")
    }

    return { budget_id: budget.id };
}

export async function addBudgetItem(input: BudgetItemsInput): Promise<BudgetItemsResult> {
    const supabase = await createSupabaseServer();

    const {
        data: { user },
        error: AuthError
    } = await supabase.auth.getUser();

    if (AuthError || !user) {
        throw new Error("Usuário não autenticado")
    }

    if (!input.budget_id) {
        throw new Error("O Campo de descrição é obrigatório")
    }

    if (!input.description || input.description.trim().length === 0) {
        throw new Error("O Campo de descrição é obrigatório")
    }
    if (!input.quantity || input.quantity <= 0) {
        throw new Error("O Campo de quantidade é obrigatório")
    }
    if (!input.unit_price || input.unit_price) {
        throw new Error("O Campo de preço é obrigatório")
    }

    const { data: item, error: itemError } = await supabase
        .from("budget_items")
        .insert({
            budget_id: input.budget_id,
            description: input.description,
            quantity: input.quantity,
            unit_price: input.unit_price,

        })
        .select("id")
        .single();

    if (itemError || !item) {
        throw new Error("Falha ao criar orçamento");
    }
    await recalculateBudgetTotals(input.budget_id);

    return { budget_items_id: item.id };
}

export async function updateBudgetItem(input: UpdateBudgetItemInput) {

    const supabase = await createSupabaseServer();

    const {
        data: { user },
        error: AuthError
    } = await supabase.auth.getUser();

    if (AuthError || !user) {
        throw new Error("Usuário não autenticado")
    }

    const updateData: Record<string, unknown> = {};

    if (input.description !== undefined) {
        updateData.description = input.description;
    }

    if (input.quantity !== undefined) {
        updateData.quantity = input.quantity;
    }

    if (input.unit_price !== undefined) {
        updateData.unit_price = input.unit_price;
    }

    if (Object.keys(updateData).length === 0) {
        throw new Error("Nenhum campo para atualizar")
    }

    const { data: item, error } = await supabase
        .from("budget_items")
        .update(updateData)
        .eq("id", input.item_id)
        .select("budget_id")
        .single();

    if (error || !item) {
        throw new Error("Erro ao atualizar item");
    }

    await recalculateBudgetTotals(item.budget_id);
}

export async function deleteBudgetItem(item_id: string) {
    const supabase = await createSupabaseServer();

    const { data: { user }, error: AuthError } = await supabase.auth.getUser();

    if (AuthError || !user) {
        throw new Error("Usuário não autenticado")
    }

    if (!item_id) {
        throw new Error("Orçamento inválido")
    }

    const { data: item, error: findError } = await supabase
        .from("budget_items")
        .select("budget_id")
        .eq("id", item_id)
        .single();

    if (findError || !item) {
        throw new Error(findError?.message ?? "Item não encontrado");
    }

    const { error } = await supabase
        .from("budget_items")
        .delete()
        .eq("id", item_id);

    if (error) {
        throw new Error("Erro ao remover o item")
    }

    await recalculateBudgetTotals(item.budget_id)

}


export async function recalculateBudgetTotals(budget_id: string): Promise<RecalculateBudgetTotalsResult> {
    const supabase = await createSupabaseServer();

    const { data: { user }, error: AuthError } = await supabase.auth.getUser();

    if (AuthError || !user) {
        throw new Error("Usuário não autenticado")
    }

    if (!budget_id) {
        throw new Error("Orçamento inválido")
    }

    const { data: items, error: ItemsError } = await supabase
        .from("budget_items")
        .select("quantity, unit_price")
        .eq("budget_id", budget_id);

    if (ItemsError) throw new Error("Erro ao Buscar itens no orçamento")

    // calculo subtotal e total

    const subtotal = (items ?? []).reduce((acc, item) => {
        return acc + item.quantity * Number(item.unit_price);
    }, 0)

    // MVP total = subtotal
    const total = subtotal

    const { error: updateError } = await supabase
        .from("budget")
        .update({
            subtotal,
            total
        })
        .eq("id", budget_id);

    if (updateError) {
        throw new Error("Erro ao atualizar totais do orçamento")
    }

    return { subtotal, total }
}