"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = ["Home", "About", "Blog", "Contact us", "Careers"];

export function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const isDetailsPage = pathname?.includes("video");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-8">
      <div className="max-w-5xl flex flex-row items-center justify-between m-auto px-4">
        {isDetailsPage ? (
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-6 py-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl text-gray-200 text-md font-medium hover:bg-white/10 transition-colors cursor-pointer"
          >
            Back
          </button>
        ) : (
          <Link
            href="/"
            className="flex items-baseline gap-2 px-6 py-2 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl"
          >
            <span className="text-lg font-semibold">CLV</span>
            <span className="text-sm text-gray-400 font-medium">Clips</span>
          </Link>
        )}
        {!isDetailsPage && (
          <ul className="gap-6 px-6 py-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl hidden sm:flex">
            {navItems.map((item) => (
              <li key={item}>
                <span className="text-gray-200 cursor-pointer text-sm font-medium opacity-90 hover:opacity-100 transition-opacity">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}
