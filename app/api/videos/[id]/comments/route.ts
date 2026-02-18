import { MOCK_COMMENTS } from "@/data/mock-comments";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return NextResponse.json(MOCK_COMMENTS);
}

export async function PUT(req: NextRequest) {
  const { comment } = await req.json();

  const newComment = { ...comment, createdAt: Date.now() };
  MOCK_COMMENTS.unshift(newComment);

  return NextResponse.json(MOCK_COMMENTS);
}
