import { use } from "react";
import { VideoDetails } from "@/components/video/video-details";
import { notFound } from "next/navigation";

export default function VideoDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  if (!id) notFound();

  return (
    <main>
      <VideoDetails videoId={id} />
    </main>
  );
}
