import { NextRequest, NextResponse } from "next/server";
import { updateBudgetItem, deleteBudgetItem } from "@/src/actions/budget";

export async function PATCH(
    response: NextRequest,
    { params }: { params: { id: string } }

) {
    try {
        const body = await response.json();

        const updateItem = await updateBudgetItem({
            item_id: params.id,
            description: body.description,
            quantity: body.quantity,
            unit_price: body.unit_price
        });

        return NextResponse.json({
            ok: true,
            data: updateItem
        })


    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Erro desconhecido"

        return NextResponse.json(
            { ok: false, error: errorMessage },
            { status: 400 })
    }
}

export async function DELETE(
    _: NextRequest,
    { params }: { params: { id: string } }
) {
    try {


        await deleteBudgetItem(params.id);
        return NextResponse.json({ ok: true, message: "Item deletado" });

    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Erro desconhecido";

        return NextResponse.json(
            { ok: false, error: errorMessage },
            { status: 400 }
        )

    }
}
