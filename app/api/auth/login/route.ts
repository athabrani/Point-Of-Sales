import { NextResponse } from "next/server";
import { createSessionValue } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const response = await fetch(
      "https://pos-system-be-pi.vercel.app/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Login failed" },
        { status: 401 }
      );
    }

    const role = data.role.toUpperCase();

    const user = {
      id: data.id,
      name: `${data.first_name} ${data.last_name}`,
      username: username,
      email: "unknown@example.com",
      role: role,
    };

    const res = NextResponse.json(data);

    res.cookies.set("session", createSessionValue(user), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });

    return res;
  } catch (error) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}