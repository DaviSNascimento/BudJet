import { CreateBudgetInput, CreateBudgetResult } from "../types/budget";
import { Client } from '../types/client';
import { createSupabaseServer } from "../lib/supabase/server";

export async function createBudget(input: CreateBudgetInput, client: Client): Promise<CreateBudgetResult> {

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

    let clientId: string | null = null;

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

        clientId = client.id;
    }

    // persistir ( inserindo orçamento no banco)
    const { data: budget, error: budgetError } = await supabase
        .from("budget")
        .insert({
            user_id: user.id,
            client_id: clientId,
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

    return { budgetId: budget.id };
}