import { NextRequest, NextResponse } from "next/server";
import { updateBudgetItem, deleteBudgetItem } from "@/src/actions/budget";

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }

) {
    try {
        const { id } = await params;
        const body = await request.json();

        const updateItem = await updateBudgetItem({
            item_id: id,
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
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {

        const { id } = await params;

        await deleteBudgetItem(id);
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
