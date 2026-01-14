import { addBudgetItem } from "@/src/actions/budget";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const item = await addBudgetItem({
            budget_id: body.budget_id,
            description: body.description,
            quantity: body.quantity,
            unit_price: body.unit_price,
        })
        return NextResponse.json({
            ok: true,
            item: item
        });

    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Erro desconhecido";

        return NextResponse.json(
            { ok: false, error: errorMessage },
            { status: 400 }
        )

    }
}