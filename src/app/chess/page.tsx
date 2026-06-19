import Link from "next/link";
import Image from "next/image";
import {sanityFetch} from "@/sanity/lib/fetch";
import {CHESS_QUERY} from "@/sanity/lib/queries";
import {urlForImage} from "@/sanity/lib/image";
import type {Chess} from "@/sanity/types";

export const metadata = {title: "Chess — gasemilauh"};

const PLATFORM_LABELS: Record<string, string> = {
  chesscom: "Chess.com",
  lichess: "Lichess",
  other: "Other",
};

const COLOR_LABELS: Record<string, string> = {
  white: "as White",
  black: "as Black",
  both: "both colours",
};

export default async function ChessPage() {
  const data = await sanityFetch<Chess>(CHESS_QUERY);

  return (
    <main
      className="bg-chess flex-1 text-stone-900"
      style={{fontFamily: "var(--font-chess)"}}
    >
      <div className="chessboard-strip h-3 w-full" />
      <div className="mx-auto max-w-4xl px-6 py-12">
        <Link
          href="/"
          className="text-sm uppercase tracking-widest text-stone-500 hover:text-stone-900"
        >
          ← Back to hub
        </Link>

        <header className="mt-6 border-b-2 border-stone-800 pb-6">
          <h1 className="text-6xl font-bold tracking-tight">Chess</h1>
          {data?.rating != null && (
            <p className="mt-2 text-2xl text-stone-600">
              Current rating{" "}
              <span className="font-bold text-stone-900">{data.rating}</span>
            </p>
          )}
        </header>

        {!data && (
          <p className="mt-10 text-xl text-stone-500">
            Nothing here yet. Add your chess details in the Studio.
          </p>
        )}

        {data?.accounts && data.accounts.length > 0 && (
          <section className="mt-10">
            <h2 className="text-3xl font-semibold">My accounts</h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {data.accounts.map((a) => (
                <li key={a._key}>
                  <a
                    href={a.url ?? "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-stone-800 px-4 py-2 text-lg transition-colors hover:bg-stone-800 hover:text-white"
                  >
                    <span className="font-semibold">
                      {PLATFORM_LABELS[a.platform] ?? a.platform}
                    </span>
                    {a.username && <span className="opacity-70">@{a.username}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {data?.favoriteOpenings && data.favoriteOpenings.length > 0 && (
          <section className="mt-12">
            <h2 className="text-3xl font-semibold">Favourite openings</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {data.favoriteOpenings.map((o) => (
                <article
                  key={o._key}
                  className="overflow-hidden rounded-lg border border-stone-300 bg-white/60 shadow-sm"
                >
                  {o.photo && (
                    <Image
                      src={urlForImage(o.photo).width(800).fit("max").url()}
                      alt={o.name}
                      width={800}
                      height={Math.round(800 / (o.photoAspect ?? 1.5))}
                      className="h-auto w-full border-b border-stone-300 bg-stone-100"
                    />
                  )}
                  <div className="p-5">
                    <h3 className="text-2xl font-bold">{o.name}</h3>
                    {o.color && (
                      <p className="text-stone-500">{COLOR_LABELS[o.color]}</p>
                    )}
                    {o.moves && (
                      <p className="mt-2 font-mono text-sm text-stone-700">
                        {o.moves}
                      </p>
                    )}
                    {o.notes && <p className="mt-2 text-stone-600">{o.notes}</p>}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {data?.tournamentsWon && data.tournamentsWon.length > 0 && (
          <section className="mt-12">
            <h2 className="text-3xl font-semibold">Tournaments won 🏆</h2>
            <ul className="mt-4 space-y-3">
              {data.tournamentsWon.map((t) => (
                <li
                  key={t._key}
                  className="flex flex-wrap items-baseline justify-between gap-2 border-b border-stone-300 pb-3"
                >
                  <span className="text-2xl font-semibold">{t.name}</span>
                  <span className="text-stone-500">
                    {[t.location, t.date].filter(Boolean).join(" · ")}
                  </span>
                  {t.notes && (
                    <span className="w-full text-stone-600">{t.notes}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
      <div className="chessboard-strip h-3 w-full" />
    </main>
  );
}
