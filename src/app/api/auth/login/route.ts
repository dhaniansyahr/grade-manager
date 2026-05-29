import { type NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/lib/services/AuthService";
import type { LoginInput } from "@/types";

const service = new AuthService();

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: LoginInput = await request.json();
    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: "email and password are required" },
        { status: 400 },
      );
    }

    console.log("boyd: ", body);
    const result = await service.login(body);
    const response = NextResponse.json({ data: result }, { status: 200 });
    response.cookies.set("auth_token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed";
    const status = message === "Invalid credentials" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
