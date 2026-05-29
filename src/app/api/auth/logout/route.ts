import { NextResponse } from "next/server";

export function POST(): NextResponse {
  const response = NextResponse.json({ data: { message: "Logged out" } }, { status: 200 });
  response.cookies.delete("auth_token");
  return response;
}
