import { RecentlyViewed } from "@/components/recently-viewed";
import { VideoFeed } from "@/components/video-feed";

export default function Home() {
  return (
    <main className="">
      <div className="max-w-5xl flex flex-col m-auto px-4">
        <RecentlyViewed />
        <VideoFeed />
      </div>
    </main>
  );
}
