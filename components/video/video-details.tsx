"use client";
import { Video } from "@/types/video";
import { VideoPlayer } from "./video-player";
import { useRecentlyViewed } from "@/stores/recently-viewed";
import { useEffect } from "react";

type Props = {
  video: Video;
};

export function VideoDetails({ video }: Props) {
  const addRecentlyViewed = useRecentlyViewed(
    (state) => state.addRecentlyViewed,
  );

  useEffect(() => {
    addRecentlyViewed(video);
  }, [addRecentlyViewed, video]);

  return (
    <div className="max-w-5xl flex flex-col m-auto px-4">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">{video.title}</h2>
      </div>
      <div className="mb-6">
        <VideoPlayer
          options={{
            autoplay: false,
            controls: true,
            sources: [
              {
                src: video?.hlsUrl,
              },
            ],
          }}
          onTimeUpdate={(currentTime) => {
            console.log("currentTime", currentTime);
          }}
        />
      </div>
    </div>
  );
}
