import Link from "next/link";
import Image from "next/image";
import {sanityFetch} from "@/sanity/lib/fetch";
import {MANGA_QUERY} from "@/sanity/lib/queries";
import {urlForImage} from "@/sanity/lib/image";
import type {Manga} from "@/sanity/types";

export const metadata = {title: "Manga — gasemilauh"};

const STATUS_LABELS: Record<string, string> = {
  reading: "READING",
  completed: "COMPLETED",
  wishlist: "WANT TO READ",
};

function MangaPanel({manga, rotate}: {manga: Manga; rotate: string}) {
  const img = manga.cover
    ? urlForImage(manga.cover).width(400).height(560).fit("crop").url()
    : null;
  return (
    <article
      className={`border-4 border-black bg-white shadow-[6px_6px_0_0_#000] ${rotate}`}
    >
      <div className="relative aspect-[5/7] border-b-4 border-black bg-neutral-200">
        {img ? (
          <Image
            src={img}
            alt={manga.title}
            fill
            className="object-cover grayscale"
            sizes="300px"
          />
        ) : (
          <div className="screentone flex h-full items-center justify-center" />
        )}
        <span className="absolute left-0 top-0 bg-black px-2 py-1 text-xs font-bold tracking-widest text-white">
          {STATUS_LABELS[manga.status]}
        </span>
      </div>
      <div className="p-4">
        <h3
          className="text-3xl leading-none"
          style={{fontFamily: "var(--font-manga)"}}
        >
          {manga.title}
        </h3>
        {manga.author && (
          <p className="text-sm text-neutral-600">by {manga.author}</p>
        )}
        <div className="mt-2 flex items-center justify-between text-sm font-bold">
          {manga.progress && <span>{manga.progress}</span>}
          {manga.rating != null && <span>★ {manga.rating}/10</span>}
        </div>
        {manga.thoughts && (
          <p className="mt-3 border-t-2 border-dashed border-black pt-2 text-sm text-neutral-800">
            {manga.thoughts}
          </p>
        )}
      </div>
    </article>
  );
}

const ROTATIONS = ["-rotate-1", "rotate-1", "rotate-0", "rotate-1", "-rotate-1"];

export default async function MangaPage() {
  const manga = await sanityFetch<Manga[]>(MANGA_QUERY);
  const reading = manga.filter((m) => m.status !== "wishlist");
  const wishlist = manga.filter((m) => m.status === "wishlist");

  return (
    <main className="screentone flex-1 bg-white text-black">
      <div className="mx-auto max-w-6xl bg-white/80 px-6 py-12">
        <Link
          href="/"
          className="text-sm font-bold uppercase tracking-widest hover:underline"
        >
          ← Back to hub
        </Link>

        <h1
          className="mt-6 -skew-y-2 text-7xl text-black sm:text-8xl"
          style={{fontFamily: "var(--font-manga)"}}
        >
          Manga
        </h1>
        <p className="mt-2 text-right text-xs uppercase tracking-widest text-neutral-500">
          読む — read right to left
        </p>

        {manga.length === 0 && (
          <p className="mt-10 text-xl">
            Nothing here yet — add the manga you read in the Studio.
          </p>
        )}

        {reading.length > 0 && (
          <section className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {reading.map((m, i) => (
                <MangaPanel
                  key={m._id}
                  manga={m}
                  rotate={ROTATIONS[i % ROTATIONS.length]}
                />
              ))}
            </div>
          </section>
        )}

        {wishlist.length > 0 && (
          <section className="mt-16">
            <h2
              className="text-5xl"
              style={{fontFamily: "var(--font-manga)"}}
            >
              Wishlist
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {wishlist.map((m, i) => (
                <MangaPanel
                  key={m._id}
                  manga={m}
                  rotate={ROTATIONS[i % ROTATIONS.length]}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
