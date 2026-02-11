import { Video } from "@/types/video";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type RecentlyViewedStore = {
  recentlyViewed: Video[];
  addRecentlyViewed: (video: Video) => void;
};

export const useRecentlyViewed = create<RecentlyViewedStore>()(
  persist(
    (set, get) => ({
      recentlyViewed: [],
      addRecentlyViewed: (video) =>
        set({
          recentlyViewed: [
            video,
            ...get().recentlyViewed.filter((v) => video.id !== v.id),
          ].slice(0, 4),
        }),
    }),
    { name: "recently-viewed" },
  ),
);
