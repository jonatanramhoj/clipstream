import { useRef, useState } from "react";
import Moment from "react-moment";
import useSWR from "swr";
import { CommentsSkeleton } from "../skeletons/comments-skeleton";
import { Comment } from "@/types/comment";

export function Comments({ videoId }: { videoId: string }) {
  const [isFocused, setIsFocused] = useState(false);
  const buttonWrapperRef = useRef<HTMLDivElement>(null);

  const mockUser = {
    name: "John Doe",
  };

  const {
    data: comments,
    isLoading,
    error,
    mutate,
  } = useSWR<Comment[]>(`/api/videos/${videoId}/comments`);

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

    const options = {
      optimisticData: [...(comments ?? []), newComment],
      rollbackOnError: true,
      throwOnError: false,
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
      </div>
    </>
  );
}
