import { Video } from "@/types/video";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type RecentlyViewedStore = {
  recentlyViewed: Video[];
  addRecentlyViewed: (video: Video) => void;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
};

export const useRecentlyViewed = create<RecentlyViewedStore>()(
  persist(
    (set, get) => ({
      hasHydrated: false,
      setHasHydrated: (state) => set({ hasHydrated: state }),
      recentlyViewed: [],
      addRecentlyViewed: (video) =>
        set({
          recentlyViewed: [
            video,
            ...get().recentlyViewed.filter((v) => video.id !== v.id),
          ].slice(0, 4),
        }),
    }),
    {
      name: "recently-viewed",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
