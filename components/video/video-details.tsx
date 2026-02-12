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
    return <span>Loading...</span>;
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
    <div className="max-w-5xl flex flex-col m-auto px-4">
      <div className="flex justify-between mb-4">
        {editMode ? (
          <>
            <input
              {...register("title")}
              name="title"
              type="text"
              defaultValue={video?.title}
              className="border border-gray-600 p-4 rounded-xl w-[500px] outline-0 focus:border-blue-600 h-[40px]"
              autoFocus
            />
          </>
        ) : (
          <h2 className="text-2xl font-bold">{video?.title}</h2>
        )}
        <>
          <div className="flex">
            {editMode && (
              <button className="btn mr-2" onClick={() => setEditMode(false)}>
                Cancel
              </button>
            )}
            <button
              className="btn text-center w-[80px] flex items-center justify-center disabled:cursor-not-allowed bg-blue-900 hover:bg-blue-800"
              onClick={
                editMode ? handleSubmit(onSubmit) : () => setEditMode(!editMode)
              }
              disabled={isSubmiting}
            >
              {isSubmiting ? <Spinner /> : editMode ? "Save" : "Edit"}
            </button>
          </div>
        </>
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
