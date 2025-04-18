import ShortenUrl from "@/components/shortenUrl";

//tailwind formatting of non header elements
export default function HomePage() {
  return (
      <main className="min-h-screen bg-pink-200">
        <div className="max-w-xl mx-auto py-10 px-4 text-center">
          <h1 className="text-3xl font-bold mb-2 mt-12">URL Shortener</h1>
          <p className="text-gray-600 mb-6">Shorten your long URLs into compact, shareable links</p>
        </div>
          <ShortenUrl />
      </main>
  );
}