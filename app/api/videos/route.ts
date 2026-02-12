import { NextResponse } from "next/server";
import { MOCK_VIDEOS } from "@/data/mock-videos";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return NextResponse.json(MOCK_VIDEOS);
}
