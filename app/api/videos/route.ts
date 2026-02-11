import { MOCK_VIDEOS } from "@/data/mock-videos";
import { NextResponse } from "next/server";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return NextResponse.json(MOCK_VIDEOS);
}
