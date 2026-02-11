import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-5xl flex flex-col m-auto px-4">
      <h2 className="font-bold text-2xl text-yellow-400 mb-4">Not Found</h2>
      <p className="mb-4">Could not find requested resource</p>
      <Link
        href="/"
        className="p-4 rounded-2xl bg-gray-900 self-start hover:bg-gray-800 transition-all delay-150 ease-in-out"
      >
        Return Home
      </Link>
    </div>
  );
}
