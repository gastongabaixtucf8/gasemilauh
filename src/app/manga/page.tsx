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

// rising fire embers (deterministic)
const EMBERS = Array.from({length: 20}, (_, i) => ({
  left: (i * 47 + 5) % 100,
  size: 2 + (i % 3),
  dur: 6 + (i % 5),
  delay: -((i * 1.1) % 7),
  drift: (i % 2 === 0 ? 1 : -1) * (10 + (i % 4) * 8),
}));

function MangaPanel({manga}: {manga: Manga}) {
  const img = manga.cover
    ? urlForImage(manga.cover).width(400).height(560).fit("crop").url()
    : null;
  const s = STATUS[manga.status];
  return (
    <article
      dir="ltr"
      className="relative rounded-sm border-2 border-orange-700/70 bg-neutral-950/85 shadow-[0_0_18px_rgba(234,88,12,0.25)]"
    >
      <div className="relative aspect-[5/7] overflow-hidden border-b-2 border-orange-700/70 bg-neutral-900">
        {img ? (
          <Image
            src={img}
            alt={manga.title}
            fill
            className="object-cover"
            sizes="320px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-orange-500/50">
            炎
          </div>
        )}
        <span
          className="absolute right-0 top-0 flex items-center gap-1 bg-gradient-to-r from-red-700 to-orange-500 px-2 py-1 text-white"
          style={mincho}
        >
          <span className="text-[11px] font-bold leading-none">{s.jp}</span>
          <span className="text-[8px] tracking-widest opacity-90">{s.en}</span>
        </span>
      </div>
      <div className="p-4" style={mincho}>
        <h3 className="fire-text text-3xl leading-tight" style={brush}>
          {manga.title}
        </h3>
        {manga.author && (
          <p className="text-sm text-amber-200/60">{manga.author}</p>
        )}
        <div className="mt-2 flex items-center justify-between text-sm font-semibold text-amber-100">
          {manga.progress && <span>{manga.progress}</span>}
          {manga.rating != null && (
            <span className="whitespace-nowrap text-yellow-400">
              ★ {manga.rating}/10
            </span>
          )}
        </div>
        {manga.thoughts && (
          <p className="mt-3 border-t border-orange-800/60 pt-2 text-sm leading-relaxed text-amber-100/80">
            {manga.thoughts}
          </p>
        )}
      </div>
    </article>
  );
}

function Grid({items}: {items: Manga[]}) {
  return (
    <div dir="rtl" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
    <main
      className="bg-manga-page relative flex-1 overflow-hidden text-amber-50"
      style={mincho}
    >
      {/* red moon */}
      <div
        className="pointer-events-none fixed left-[6%] top-[8%] z-0 h-44 w-44 rounded-full"
        style={{
          background: "radial-gradient(circle, #ef4444 0%, #991b1b 70%, #7f1d1d 100%)",
          boxShadow: "0 0 90px 24px rgba(220,38,38,0.5)",
        }}
      />
      {/* rising embers */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {EMBERS.map((e, i) => (
          <span
            key={i}
            className="ember absolute bottom-0 rounded-full bg-amber-400 shadow-[0_0_6px_2px_rgba(251,146,60,0.7)]"
            style={{
              left: `${e.left}%`,
              width: e.size,
              height: e.size,
              animationDuration: `${e.dur}s`,
              animationDelay: `${e.delay}s`,
              ["--drift" as string]: `${e.drift}px`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-12">
        <Link
          href="/"
          className="text-sm tracking-widest text-amber-200/60 hover:text-amber-100"
        >
          ← 戻る / Back to hub
        </Link>

        {/* fiery title block */}
        <header className="relative mt-6 border-y-4 border-orange-700/70 py-10">
          <div className="relative flex items-end justify-between gap-4">
            <div>
              <p className="text-sm tracking-[0.3em] text-orange-400/80">MANGA</p>
              <h1 className="fire-text text-7xl leading-none sm:text-8xl" style={brush}>
                漫画
              </h1>
            </div>
            <p
              className="text-right text-xs leading-relaxed text-amber-200/60"
              style={{writingMode: "vertical-rl"}}
            >
              読む — 右から左へ
            </p>
          </div>
        </header>

        {manga.length === 0 && (
          <p className="mt-10 text-xl text-amber-100/80">
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
              <h2 className="fire-text text-4xl" style={brush}>
                欲しい
              </h2>
              <span className="text-sm tracking-[0.3em] text-orange-400/80">
                WISHLIST
              </span>
              <span className="h-[2px] flex-1 bg-gradient-to-r from-orange-600 to-transparent" />
            </div>
            <Grid items={wishlist} />
          </section>
        )}
      </div>
    </main>
  );
}
