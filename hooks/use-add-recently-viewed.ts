import { useRecentlyViewed } from "@/stores/recently-viewed";
import { Video } from "@/types/video";
import { useEffect } from "react";

export function useAddRecentlyViewed({ video }: { video: Video }) {
  const addRecentlyViewed = useRecentlyViewed(
    (state) => state.addRecentlyViewed,
  );

  useEffect(() => {
    addRecentlyViewed(video);
  }, [addRecentlyViewed, video]);
}
