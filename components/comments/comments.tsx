import { useRef, useState } from "react";
import Moment from "react-moment";
import { CommentsSkeleton } from "../skeletons/comments-skeleton";
import { Comment } from "@/types/comment";
import useSWRInfinite, { SWRInfiniteMutatorOptions } from "swr/infinite";
import { Spinner } from "../spinner";

type CommentPage = {
  comments: Comment[];
  nextCursor: number | null;
};

export function Comments({ videoId }: { videoId: string }) {
  const [isFocused, setIsFocused] = useState(false);
  const buttonWrapperRef = useRef<HTMLDivElement>(null);
  const mockUser = { name: "John Doe" };

  const getKey = (pageIndex: number, previousPageData: CommentPage | null) => {
    const defaultLimit = 5;

    // 1. If we reached the end (API returned no nextCursor), stop fetching
    if (previousPageData && !previousPageData.nextCursor) return null;

    // 2. First page (index 0), fetch without a cursor
    if (pageIndex === 0)
      return `/api/videos/${videoId}/comments?limit=${defaultLimit}`;

    // 3. Subsequent pages: use the cursor from the previous response
    return `/api/videos/${videoId}/comments?cursor=${previousPageData?.nextCursor}&limit=${defaultLimit}`;
  };

  const { data, isLoading, isValidating, error, mutate, size, setSize } =
    useSWRInfinite<CommentPage | null>(getKey, { revalidateOnFocus: false });

  const comments = data?.flatMap((page) => page?.comments ?? []) ?? [];
  const nextCursor = data?.at(-1)?.nextCursor;

  function handleSubmit(formData: FormData) {
    const newCommentText = formData.get("newComment");

    if (!newCommentText) return;

    const newComment: Comment = {
      id: -Date.now(),
      authorName: mockUser.name,
      text: newCommentText.toString(),
    };

    const updateFn = async () => {
      const res = await fetch(`/api/videos/${videoId}/comments`, {
        method: "PUT",
        body: JSON.stringify({ comment: newComment }),
      });

      if (!res.ok) throw new Error("Failed to add comment");

      return res.json();
    };

    const options: SWRInfiniteMutatorOptions<(CommentPage | null)[]> = {
      optimisticData: (allPages) => {
        // If no pages (comments) exist yet, create the first one manually
        if (!allPages || !allPages[0]) {
          return [{ comments: [newComment], nextCursor: null }];
        }

        const [firstPage, ...olderPages] = allPages;

        // copy the first page and prepend the new comment
        const updatedFirstPage = {
          ...firstPage,
          comments: [newComment, ...firstPage.comments],
        };

        // return the all pages array with the updated first page
        return [updatedFirstPage, ...olderPages];
      },
      rollbackOnError: true,
      throwOnError: false,
      revalidate: false,
    };

    mutate(updateFn, options);
  }

  function handleFocus() {
    setIsFocused(true);
  }

  function handleCancel() {
    setIsFocused(false);
  }

  if (isLoading) return <CommentsSkeleton />;

  if (error) {
    return <span>Couldn&apos;t load comments</span>;
  }

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
            onFocus={handleFocus}
          />

          <div className="flex justify-end">
            {isFocused && (
              <div className="flex" ref={buttonWrapperRef}>
                <button className="btn-cancel mr-2" onClick={handleCancel}>
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
          className="btn disabled:cursor-not-allowed! disabled:bg-gray-700 flex items-center justify-center"
          onClick={() => setSize(size + 1)}
          disabled={isValidating || !nextCursor}
        >
          {isValidating ? (
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
