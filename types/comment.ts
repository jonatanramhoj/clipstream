export type Comment = {
  id: number;
  authorName: string;
  authorAvatar?: string;
  text: string;
  createdAt?: string;
};

export type CommentPage = {
  comments: Comment[];
  nextCursor: number | null;
};
