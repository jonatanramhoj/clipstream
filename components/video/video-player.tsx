// import dynamic from 'next/dynamic'
import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

// const VideoJS = dynamic(() => import('video.js'), { ssr: false })

type Player = ReturnType<typeof videojs>;
type VideoJsOptions = Parameters<typeof videojs>[1];

type Props = {
  options: VideoJsOptions;
  onReady?: (player: Player) => void;
  onTimeUpdate?: (currentTime: number) => void;
};

export function VideoPlayer({ options, onReady, onTimeUpdate }: Props) {
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);
  const onTimeUpdateRef = useRef(onTimeUpdate);

  useEffect(() => {
    if (playerRef.current || !videoRef.current) return;

    const videoElement = document.createElement("video-js");
    videoElement.classList.add("vjs-big-play-centered");
    videoRef.current.appendChild(videoElement);

    const player = (playerRef.current = videojs(videoElement, options, () => {
      videojs.log("player is ready");
      onReady?.(player);
      if (onTimeUpdateRef.current) {
        player.on("timeupdate", () => {
          onTimeUpdateRef.current?.(player.currentTime() ?? 0);
        });
      }
    }));
  }, [onReady, options]);

  useEffect(() => {
    return () => {
      const player = playerRef.current;
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
}
