"use client";
import { VideoPlayer } from "./video-player";
import { useState } from "react";
import useSWR from "swr";
import { VideoDetailsSkeleton } from "../skeletons/video-details-skeleton";
import { VideoLoadError } from "./video-load-error";
import { Comments } from "../comments/comments";

export function VideoDetails({ videoId }: { videoId: string }) {
  const {
    data: video,
    isLoading,
    error,
    mutate,
  } = useSWR(`/api/videos/${videoId}`);

  const [isEditing, setIsEditing] = useState(false);

  if (isLoading) return <VideoDetailsSkeleton />;

  if (error) return <VideoLoadError onRetry={mutate} />;

  function handleSubmit(formData: FormData) {
    const newTitle = formData.get("title");

    const updateFn = async () => {
      const res = await fetch(`/api/videos/${videoId}`, {
        method: "PATCH",
        body: JSON.stringify({ ...video, title: newTitle }),
      });

      if (!res.ok) throw new Error("Failed to update");

      return res.json();
    };

    const options = {
      optimisticData: { ...video, title: newTitle },
      rollbackOnError: true,
      throwOnError: false,
    };

    mutate(updateFn, options);
    setIsEditing(false);
  }

  return (
    <div className="max-w-5xl flex flex-col m-auto px-4 py-8">
      <form
        action={isEditing ? handleSubmit : () => setIsEditing(!isEditing)}
        className="flex flex-wrap items-center justify-between gap-4 mb-6"
      >
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              name="title"
              type="text"
              defaultValue={video?.title}
              className="input"
              autoFocus
            />
          ) : (
            <h2 className="text-2xl font-semibold tracking-tight text-foreground truncate">
              {video?.title}
            </h2>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {isEditing && (
            <button onClick={() => setIsEditing(false)} className="btn-cancel">
              Cancel
            </button>
          )}
          <button className="btn-submit">{isEditing ? "Save" : "Edit"}</button>
        </div>
      </form>

      <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/20 mb-8">
        <VideoPlayer
          options={{
            autoplay: false,
            controls: true,
            sources: [{ src: video?.hlsUrl }],
          }}
          onTimeUpdate={() => {}}
        />
      </div>
      <Comments videoId={videoId} />
    </div>
  );
}
