"use client";
import { Video } from "@/types/video";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { VideoFeedSkeleton } from "@/components/skeletons/video-feed-skeleton";

export function VideoFeed() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading, error, mutate } = useSWR<Video[]>(
    "/api/videos",
    fetcher,
    { revalidateOnFocus: false },
  );

  console.log("data", data);

  if (isLoading) {
    return <VideoFeedSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <p className="text-red-500">Failed to load videos</p>
        <button onClick={() => mutate()} className="btn">
          Retry
        </button>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-3 gap-4">
      {data?.map((video) => (
        <li key={video.id}>
          <Link href={`/video/${video.id}`}>
            <Image
              src={video.thumbnail}
              alt={video.title}
              width={300}
              height={200}
              className="mb-2 w-full rounded-2xl"
              unoptimized
            />
            <span>{video.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
