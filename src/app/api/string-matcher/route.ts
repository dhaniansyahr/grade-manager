import { type NextRequest, NextResponse } from "next/server";
import { StringMatcherService } from "@/lib/services/StringMatcherService";
import type { StringMatcherInput } from "@/types";

const matcher = new StringMatcherService();

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: StringMatcherInput = await request.json();
    const matchPercentage = matcher.matchPercentage(
      body.input1,
      body.input2,
      body.caseSensitive,
    );
    return NextResponse.json(
      {
        data: {
          matchPercentage,
          input1: body.input1,
          input2: body.input2,
          caseSensitive: body.caseSensitive,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to run string matcher" },
      { status: 500 },
    );
  }
}
