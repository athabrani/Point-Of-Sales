import { NextResponse } from "next/server";

const BASE_URL = "https://pos-system-be-pi.vercel.app";

export async function GET() {
  try {
    const res = await fetch(`${BASE_URL}/products/summary`, {
      cache: "no-store",
    });

    const data = await res.json();

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch summary" },
      { status: 500 },
    );
  }
}
