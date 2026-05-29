import { type NextRequest, NextResponse } from "next/server";
import { StudentService } from "@/lib/services/StudentService";
import type { CreateStudentInput } from "@/types";

const service = new StudentService();

export async function GET(): Promise<NextResponse> {
  try {
    const students = await service.getAllStudents();
    return NextResponse.json({ data: students }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: CreateStudentInput = await request.json();
    const student = await service.createStudent(body);
    return NextResponse.json({ data: student }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create student" },
      { status: 500 },
    );
  }
}
