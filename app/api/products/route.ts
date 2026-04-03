import { NextResponse } from "next/server";

const BASE_URL = "https://pos-system-be-pi.vercel.app";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const category = searchParams.get("category");
    const search = searchParams.get("search");

    let url = `${BASE_URL}/products/`;

    const query = new URLSearchParams();
    if (category) query.append("category", category);
    if (search) query.append("search", search);

    if (query.toString()) {
      url += `?${query.toString()}`;
    }

    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Failed GET products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const res = await fetch(`${BASE_URL}/products/`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Failed POST product" }, { status: 500 });
  }
}
