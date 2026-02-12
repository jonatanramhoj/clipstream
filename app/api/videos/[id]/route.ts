import { MOCK_VIDEOS } from "@/data/mock-videos";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = await params;

  const video = MOCK_VIDEOS.find((v) => v.id === id);

  return NextResponse.json(video);
}

export async function PATCH(req: NextRequest) {
  const { id, ...updates } = await req.json();

  const index = MOCK_VIDEOS.findIndex((v) => v.id === id);
  MOCK_VIDEOS[index] = { ...MOCK_VIDEOS[index], ...updates };

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return NextResponse.json(MOCK_VIDEOS);
}
