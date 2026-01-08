import { createSupabaseServer } from "@/src/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
    _: Request,
    { params }: { params: Promise<{ id: string }> }
) {

    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { ok: false, message: "ID do budget inválido" },
                { status: 400 }
            )
        }

        const supabase = await createSupabaseServer();

        const { data: { user }, error: AuthError } = await supabase.auth.getUser();

        if (AuthError || !user) {
            return NextResponse.json(
                { ok: false, error: "Usuário não autenticado" },
                { status: 401 }
            );

        }

        const { data: budget, error } = await supabase
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
            .eq("id", id)
            .single();

        if (error || !budget) {

            return NextResponse.json(
                { ok: false, error: "Budget não encontrado" },
                { status: 404 }
            )
        }

        return NextResponse.json({
            ok: true,
            data: budget
        })
        
    } catch (error: unknown) {
        const message =
            error instanceof Error ? error.message : "Erro desconhecido";

        return NextResponse.json(
            { ok: false, error: message },
            { status: 500 }
        );
    }
}