"use client";
import { Video } from "@/types/video";
import { VideoPlayer } from "./video-player";
import { useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { VideoDetailsSkeleton } from "../skeletons/video-details-skeleton";
import { VideoLoadError } from "./video-load-error";

export function VideoDetails({ video: initialVideo }: { video: Video }) {
  const [editMode, setEditMode] = useState(false);

  const {
    data: video,
    mutate,
    error,
    isLoading,
  } = useSWR<Video>(`/api/videos/${initialVideo.id}`);

  const { mutate: globalMutate } = useSWRConfig();

  async function handleSubmit(formData: FormData) {
    const newTitle = formData.get("title") as string;

    mutate(
      fetch(`/api/videos/${video!.id}`, {
        method: "PATCH",
        body: JSON.stringify({ ...video, title: newTitle }),
      }).then((res) => res.json()),
      { optimisticData: { ...video!, title: newTitle } },
    );

    setEditMode(false);
    globalMutate("/api/videos");
  }

  if (isLoading) {
    return <VideoDetailsSkeleton />;
  }

  if (error) {
    return <VideoLoadError onRetry={mutate} />;
  }

  return (
    <div className="max-w-5xl flex flex-col m-auto px-4 py-8">
      <form
        action={editMode ? handleSubmit : () => setEditMode(!editMode)}
        className="flex flex-wrap items-center justify-between gap-4 mb-6"
      >
        <div className="flex-1 min-w-0">
          {editMode ? (
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
          {editMode && (
            <button onClick={() => setEditMode(false)} className="btn-cancel">
              Cancel
            </button>
          )}
          <button className="btn-submit">{editMode ? "Save" : "Edit"}</button>
        </div>
      </form>

      <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/20">
        <VideoPlayer
          options={{
            autoplay: false,
            controls: true,
            sources: [{ src: video?.hlsUrl }],
          }}
          onTimeUpdate={() => {}}
        />
      </div>
    </div>
  );
}
