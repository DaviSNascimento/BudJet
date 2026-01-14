import { NextRequest, NextResponse } from "next/server";
import { updateBudgetItem, deleteBudgetItem } from "@/src/actions/budget";

type RouteContext = {
    params: {
        id: string;
    };
};

export async function PATCH(
    request: NextRequest,
    { params }: RouteContext
): Promise<Response> {
    try {
        const body = await request.json();

        await updateBudgetItem({
            item_id: params.id,
            description: body.description,
            quantity: body.quantity,
            unit_price: body.unit_price,
        });

        return NextResponse.json({ ok: true });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Erro desconhecido";

        return NextResponse.json(
            { ok: false, error: message },
            { status: 400 }
        );
    }
}

export async function DELETE(
    _request: NextRequest,
    { params }: RouteContext
): Promise<Response> {
    try {
        await deleteBudgetItem(params.id);

        return NextResponse.json({ ok: true });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Erro desconhecido";

        return NextResponse.json(
            { ok: false, error: message },
            { status: 400 }
        );
    }
}
