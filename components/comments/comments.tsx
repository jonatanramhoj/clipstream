import { useState } from "react";
import Moment from "react-moment";
import useSWRInfinite from "swr/infinite";
import { CommentsSkeleton } from "../skeletons/comments-skeleton";
import { Spinner } from "../spinner";
import { CommentPage } from "@/types/comment";
import { mockUser } from "@/data/mock-user";

export function Comments({ videoId }: { videoId: string }) {
  const [isFocused, setIsFocused] = useState(false);

  const getKey = (pageIndex: number, previousPageData: CommentPage | null) => {
    // reached the end
    if (previousPageData && !previousPageData.comments) return null;
    // first page, we don't have `previousPageData`
    if (pageIndex === 0) return `/api/videos/${videoId}/comments?limit=5`;
    // add the cursor to the API endpoint
    return `/api/videos/${videoId}/comments?cursor=${previousPageData?.nextCursor}&limit=5`;
  };

  const { data, isLoading, error, mutate, size, setSize } =
    useSWRInfinite<CommentPage | null>(getKey, { revalidateOnFocus: false });

  const comments = data?.flatMap((page) => page?.comments ?? []) ?? [];
  const nextCursor = data?.at(-1)?.nextCursor;
  const isLoadingMore = (data?.length ?? 0) > 0 && (data?.length ?? 0) < size;

  async function handleSubmit(formData: FormData) {
    const text = formData.get("newComment");

    if (!text) return;

    const newComment = {
      id: -Date.now(),
      authorName: mockUser.name,
      text: text.toString(),
    };

    const res = await fetch(`/api/videos/${videoId}/comments`, {
      method: "PUT",
      body: JSON.stringify({ comment: newComment }),
    });

    if (!res.ok) throw new Error("Failed to update");

    await mutate();
  }

  if (isLoading) return <CommentsSkeleton />;

  if (error) return <span>Failed to load comments</span>;

  return (
    <>
      <h3 className="font-bold text-xl mb-4">Comments</h3>
      <div className="w-full flex flex-col">
        <form action={handleSubmit}>
          <textarea
            name="newComment"
            id="newComment"
            placeholder="Add a comment..."
            className="input w-full max-w-full min-h-[80px] resize-y mb-4"
            rows={3}
            onFocus={() => setIsFocused(true)}
          />

          <div className="flex justify-end">
            {isFocused && (
              <div className="flex">
                <button
                  className="btn-cancel mr-2"
                  onClick={() => setIsFocused(false)}
                >
                  Cancel
                </button>
                <button className="btn-submit">Comment</button>
              </div>
            )}
          </div>
        </form>
        <ul>
          {comments?.map((comment) => (
            <li key={comment.id} className="mb-4">
              <div className="flex mb-1">
                <p className="text-sm mr-1 font-bold">{comment.authorName}</p>
                <Moment className="text-sm text-gray-400" fromNow>
                  {comment.createdAt}
                </Moment>
              </div>
              <p className="text-sm">{comment.text}</p>
            </li>
          ))}
        </ul>
        <button
          className="btn btn-load-more mt-4 mb-8"
          onClick={() => setSize(size + 1)}
          disabled={isLoadingMore || !nextCursor}
        >
          {isLoadingMore ? (
            <Spinner />
          ) : nextCursor ? (
            "Load More"
          ) : (
            "No more comments"
          )}
        </button>
      </div>
    </>
  );
}
