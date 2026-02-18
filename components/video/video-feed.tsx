"use client";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { Video } from "@/types/video";
import { VideoFeedSkeleton } from "../skeletons/video-feed-skeleton";
import { VideoLoadError } from "./video-load-error";

export function VideoFeed() {
  const {
    data: videoFeed,
    isLoading,
    error,
    mutate,
  } = useSWR<Video[]>("/api/videos");

  if (isLoading) {
    return <VideoFeedSkeleton />;
  }

  if (error) {
    return <VideoLoadError onRetry={mutate} />;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-gray-400">Video feed</h2>
      <ul className="grid grid-cols-3 gap-6">
        {videoFeed?.map((video) => (
          <li key={video.id}>
            <Link href={`/video/${video.id}`} className="group card">
              <div className="relative overflow-hidden">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  width={300}
                  height={200}
                  className="w-full transition duration-200 group-hover:brightness-110"
                  unoptimized
                />
                <div className="absolute inset-x-0 bottom-0 py-3 px-4 bg-linear-to-t from-black/80 to-transparent backdrop-blur-sm">
                  <span className="text-xl font-bold text-white/95 line-clamp-2">
                    {video.title}
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
