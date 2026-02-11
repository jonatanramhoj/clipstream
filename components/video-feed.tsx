"use client";
import Image from "next/image";
import { MOCK_VIDEOS } from "@/data/mock-videos";
import Link from "next/link";
import { useEffect, useEffectEvent, useState } from "react";
import { Search } from "./search";
import { useSearch } from "@/hooks/use-search";

export function VideoFeed() {
  const [videoFeed, setVideoFeed] = useState(MOCK_VIDEOS || []);
  const { handleSearch, searchQuery } = useSearch();

  const updateVideoFeed = useEffectEvent((query: string) => {
    const normalizedQuery = query.toLowerCase().trim();
    if (!normalizedQuery) {
      setVideoFeed(MOCK_VIDEOS);
      return;
    }

    const filteredFeed = MOCK_VIDEOS.filter((video) =>
      video.title.toLowerCase().includes(normalizedQuery)
    );
    setVideoFeed(filteredFeed);
  });

  useEffect(() => {
    updateVideoFeed(searchQuery);
  }, [searchQuery]);

  return (
    <div>
      <Search handleSearch={handleSearch} />
      <ul className="grid grid-cols-3 gap-4">
        {videoFeed.map((video) => (
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
    </div>
  );
}
