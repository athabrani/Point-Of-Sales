import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
const BASE_URL = "https://pos-system-be-pi.vercel.app";
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const formData = await req.formData();

    const res = await fetch(`${BASE_URL}/products/${params.id}`, {
      method: "PUT",
      body: formData,
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to update product" },
        { status: res.status },
      );
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (err) {
    console.error("PUT ERROR:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const res = await fetch(`${BASE_URL}/products/${params.id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to delete product" },
        { status: res.status },
      );
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (err) {
    console.error("DELETE ERROR:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
