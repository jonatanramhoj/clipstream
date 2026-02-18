import { MOCK_COMMENTS } from "@/data/mock-comments";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cursor = Number(searchParams.get("cursor") ?? 0); // a starting point number representing from where to fetch the next set of pages
  const limit = Number(searchParams.get("limit") ?? 5); // limit how many items to fetch everytime

  const page = MOCK_COMMENTS.slice(cursor, cursor + limit);

  const nextCursor =
    cursor + limit < MOCK_COMMENTS.length ? cursor + limit : null;

  await new Promise((resolve) => setTimeout(resolve, 1000));
  return NextResponse.json({ comments: page, nextCursor });
}

export async function PUT(req: NextRequest) {
  const { comment } = await req.json();

  const newComment = { ...comment, createdAt: Date.now() };
  MOCK_COMMENTS.unshift(newComment);

  return NextResponse.json(MOCK_COMMENTS);
}
