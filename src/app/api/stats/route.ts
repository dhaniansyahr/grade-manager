import { NextResponse } from "next/server";
import { StudentService } from "@/lib/services/StudentService";

const service = new StudentService();

export async function GET(): Promise<NextResponse> {
  try {
    const stats = await service.getClassStats();
    return NextResponse.json({ data: stats }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 },
    );
  }
}
