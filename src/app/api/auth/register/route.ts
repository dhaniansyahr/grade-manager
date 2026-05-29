import { type NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/lib/services/AuthService";
import type { RegisterInput } from "@/types";

const service = new AuthService();

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: RegisterInput = await request.json();
    if (!body.name || !body.email || !body.password) {
      return NextResponse.json({ error: "name, email, and password are required" }, { status: 400 });
    }
    const result = await service.register(body);
    const response = NextResponse.json({ data: result }, { status: 201 });
    response.cookies.set("auth_token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Registration failed";
    const status = message === "Email already registered" ? 409 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
