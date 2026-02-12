"use client";
import { Video } from "@/types/video";
import { VideoPlayer } from "./video-player";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAddRecentlyViewed } from "@/hooks/use-add-recently-viewed";
import { Spinner } from "../spinner";
import useSWR, { useSWRConfig } from "swr";

type Inputs = {
  title: string;
};

export function VideoDetails({ video: initialVideo }: { video: Video }) {
  const {
    data: video,
    mutate,
    error,
    isLoading,
  } = useSWR<Video>(`/api/videos/${initialVideo.id}`);
  const { mutate: globalMutate } = useSWRConfig();

  useAddRecentlyViewed({ video: initialVideo });

  const { register, handleSubmit } = useForm<Inputs>();
  const [editMode, setEditMode] = useState(false);
  const [isSubmiting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async ({ title }) => {
    setIsSubmitting(true);

    const updatedVideo = { ...video!, title };

    const res = await fetch(`/api/videos/${video!.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedVideo),
    });

    if (res.ok) {
      mutate(updatedVideo, { revalidate: true });
      globalMutate("/api/videos");
    }

    setIsSubmitting(false);
    setEditMode(false);
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl m-auto px-4 py-8 animate-pulse">
        <div className="h-8 bg-white/10 rounded-lg w-2/3 mb-6" />
        <div className="aspect-video bg-white/10 rounded-2xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <p className="text-red-400/90 text-sm">Failed to load video</p>
        <button
          onClick={() => mutate()}
          className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-sm font-medium hover:bg-white/10 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl flex flex-col m-auto px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex-1 min-w-0">
          {editMode ? (
            <input
              {...register("title")}
              name="title"
              type="text"
              defaultValue={video?.title}
              className="w-full max-w-xl px-4 py-3 rounded-xl border border-white/10 bg-white/5 outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-colors text-foreground placeholder:text-gray-500"
              autoFocus
            />
          ) : (
            <h1 className="text-2xl font-semibold tracking-tight text-foreground truncate">
              {video?.title}
            </h1>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {editMode && (
            <button
              onClick={() => setEditMode(false)}
              className="px-4 py-3 rounded-xl border border-white/10 bg-transparent text-sm font-medium hover:bg-white/5 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          )}
          <button
            onClick={
              editMode ? handleSubmit(onSubmit) : () => setEditMode(!editMode)
            }
            disabled={isSubmiting}
            className="px-5 py-3 rounded-xl border border-white/10 bg-white/10 text-sm font-medium hover:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-w-[80px] flex items-center justify-center cursor-pointer"
          >
            {isSubmiting ? <Spinner /> : editMode ? "Save" : "Edit"}
          </button>
        </div>
      </div>

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
