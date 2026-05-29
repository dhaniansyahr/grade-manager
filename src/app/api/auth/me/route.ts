import { type NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/lib/services/AuthService";
import { verifyToken, extractBearerToken } from "@/lib/auth";

const service = new AuthService();

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const token = extractBearerToken(request.headers.get("authorization"));
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const payload = verifyToken(token);
    const user = await service.getUserById(payload.sub);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ data: user }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
