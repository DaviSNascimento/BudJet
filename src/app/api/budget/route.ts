import { NextResponse } from "next/server";
import { createBudget, addBudgetItem, recalculateBudgetTotals } from "@/src/actions/budget";
import { createSupabaseServer } from "@/src/lib/supabase/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const budget = await createBudget({
            title: body.title,
            description: body.description,
            client: body.client,
        });

        if (Array.isArray(body.items)) {
            for (const item of body.items) {
                await addBudgetItem({
                    budget_id: budget.budget_id,
                    description: item.description,
                    quantity: item.quantity,
                    unit_price: item.unit_price,
                });
            }
            await recalculateBudgetTotals(budget.budget_id)
        }


        return NextResponse.json({
            ok: true,
            budget_id: budget.budget_id,
        });
    } catch (error: unknown) {
        const message =
            error instanceof Error ? error.message : "Erro desconhecido";

        return NextResponse.json(
            { ok: false, error: message },
            { status: 400 }
        );
    }

}

export async function GET() {

    try {
        const supabase = await createSupabaseServer();

        const { data: { user }, error: AuthError, } = await supabase.auth.getUser();

        if (AuthError || !user) {
            return NextResponse.json(
                { ok: false, error: "Usuário não autenticado" },
                { status: 401 }
            );
        }

        const { data: budget, error: budgetError } = await supabase
            .from("budget")
            .select(`
                id,
                title,
                description,
                status,
                subtotal,
                total,
                created_at,
                client:client_id (
                id,
                name,
                email,
                company
                ),
                items:budget_items (
                id,
                description,
                quantity,
                unit_price
                )
            `)

        if (budgetError) {
            throw budgetError
        }

        return NextResponse.json(
            {
                ok: true,
                data: budget
            });
    } catch (error: unknown) {
        const message =
            error instanceof Error ? error.message : "Erro desconhecido";

        return NextResponse.json(
            { ok: false, error: message },
            { status: 500 }
        );
    }
}

