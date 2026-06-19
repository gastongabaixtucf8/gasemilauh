import Link from "next/link";
import Image from "next/image";
import {sanityFetch} from "@/sanity/lib/fetch";
import {MANGA_QUERY} from "@/sanity/lib/queries";
import {urlForImage} from "@/sanity/lib/image";
import type {Manga} from "@/sanity/types";

export const metadata = {title: "Manga — gasemilauh"};

const brush = {fontFamily: "var(--font-manga)"};
const mincho = {fontFamily: "var(--font-manga-body)"};

const STATUS: Record<string, {jp: string; en: string}> = {
  reading: {jp: "連載中", en: "READING"},
  completed: {jp: "完結", en: "COMPLETED"},
  wishlist: {jp: "欲しい", en: "WANT TO READ"},
};

function MangaPanel({manga}: {manga: Manga}) {
  const img = manga.cover
    ? urlForImage(manga.cover).width(400).height(560).fit("crop").url()
    : null;
  const s = STATUS[manga.status];
  return (
    <article dir="ltr" className="relative border-2 border-black bg-white">
      <div className="relative aspect-[5/7] overflow-hidden border-b-2 border-black bg-neutral-100">
        {img ? (
          <Image
            src={img}
            alt={manga.title}
            fill
            className="object-cover grayscale contrast-125"
            sizes="320px"
          />
        ) : (
          <div className="screentone h-full w-full" />
        )}
        {/* inked status tag */}
        <span
          className="absolute right-0 top-0 flex items-center gap-1 bg-black px-2 py-1 text-white"
          style={mincho}
        >
          <span className="text-[11px] font-bold leading-none">{s.jp}</span>
          <span className="text-[8px] tracking-widest opacity-80">{s.en}</span>
        </span>
      </div>
      <div className="p-4" style={mincho}>
        <h3 className="text-3xl leading-tight" style={brush}>
          {manga.title}
        </h3>
        {manga.author && (
          <p className="text-sm text-neutral-600">{manga.author}</p>
        )}
        <div className="mt-2 flex items-center justify-between text-sm font-semibold">
          {manga.progress && <span>{manga.progress}</span>}
          {manga.rating != null && (
            <span className="whitespace-nowrap">★ {manga.rating}/10</span>
          )}
        </div>
        {manga.thoughts && (
          <p className="mt-3 border-t border-black pt-2 text-sm leading-relaxed text-neutral-800">
            {manga.thoughts}
          </p>
        )}
      </div>
    </article>
  );
}

function Grid({items}: {items: Manga[]}) {
  return (
    <div
      dir="rtl"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {items.map((m) => (
        <MangaPanel key={m._id} manga={m} />
      ))}
    </div>
  );
}

export default async function MangaPage() {
  const manga = await sanityFetch<Manga[]>(MANGA_QUERY);
  const reading = manga.filter((m) => m.status !== "wishlist");
  const wishlist = manga.filter((m) => m.status === "wishlist");

  return (
    <main className="flex-1 bg-white text-black" style={mincho}>
      <div className="mx-auto max-w-6xl px-6 py-12">
        <Link
          href="/"
          className="text-sm tracking-widest text-neutral-500 hover:text-black"
        >
          ← 戻る / Back to hub
        </Link>

        {/* dramatic title block with radiating focus lines */}
        <header className="relative mt-6 overflow-hidden border-y-4 border-black py-10">
          <div className="manga-focus pointer-events-none absolute inset-0 opacity-15" />
          <div className="relative flex items-end justify-between gap-4">
            <div>
              <p className="text-sm tracking-[0.3em] text-neutral-500">MANGA</p>
              <h1 className="text-7xl leading-none sm:text-8xl" style={brush}>
                漫画
              </h1>
            </div>
            <p
              className="text-right text-xs leading-relaxed text-neutral-500"
              style={{writingMode: "vertical-rl"}}
            >
              読む — 右から左へ
            </p>
          </div>
        </header>

        {manga.length === 0 && (
          <p className="mt-10 text-xl">
            まだ何もありません — add the manga you read in the Studio.
          </p>
        )}

        {reading.length > 0 && (
          <section className="mt-10">
            <Grid items={reading} />
          </section>
        )}

        {wishlist.length > 0 && (
          <section className="mt-16">
            <div className="mb-6 flex items-center gap-3">
              <h2 className="text-4xl" style={brush}>
                欲しい
              </h2>
              <span className="text-sm tracking-[0.3em] text-neutral-500">
                WISHLIST
              </span>
              <span className="manga-speed h-3 flex-1" />
            </div>
            <Grid items={wishlist} />
          </section>
        )}
      </div>
    </main>
  );
}
