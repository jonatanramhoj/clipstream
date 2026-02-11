import { use } from "react";
import { MOCK_VIDEOS } from "@/data/mock-videos";
import { VideoDetails } from "@/components/video-details";
import { Video } from "@/types/video";
import { notFound } from "next/navigation";

export default function VideoDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const video: Video | undefined = MOCK_VIDEOS.find((video) => video.id === id);

  if (!video) notFound();

  return (
    <main>
      <VideoDetails video={video} />
    </main>
  );
}
