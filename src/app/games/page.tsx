import Link from "next/link";
import Image from "next/image";
import {sanityFetch} from "@/sanity/lib/fetch";
import {GAMES_QUERY} from "@/sanity/lib/queries";
import {urlForImage} from "@/sanity/lib/image";
import type {Game} from "@/sanity/types";

export const metadata = {title: "Video Games — gasemilauh"};

function GameCard({game}: {game: Game}) {
  const img = game.photo ? urlForImage(game.photo).width(480).height(270).fit("crop").url() : null;
  return (
    <article className="pixel-box bg-indigo-950">
      <div className="relative aspect-video bg-black">
        {img ? (
          <Image src={img} alt={game.title} fill className="object-cover" sizes="320px" />
        ) : (
          <div className="flex h-full items-center justify-center text-fuchsia-400">
            NO IMAGE
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-sm leading-relaxed text-white">{game.title}</h3>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] text-fuchsia-300">
          {game.platform && <span>{game.platform}</span>}
          {game.rating != null && (
            <span className="text-yellow-300">★ {game.rating}/10</span>
          )}
        </div>
        {game.records && (
          <p className="mt-3 text-[10px] leading-relaxed text-emerald-300">
            🏆 {game.records}
          </p>
        )}
        {game.notes && (
          <p className="mt-2 text-[10px] leading-relaxed text-indigo-200">
            {game.notes}
          </p>
        )}
      </div>
    </article>
  );
}

export default async function GamesPage() {
  const games = await sanityFetch<Game[]>(GAMES_QUERY);
  const library = games.filter((g) => g.status !== "wishlist");
  const wishlist = games.filter((g) => g.status === "wishlist");

  return (
    <main
      className="flex-1 bg-indigo-950 text-white"
      style={{fontFamily: "var(--font-pixel)"}}
    >
      <div className="mx-auto max-w-6xl px-6 py-12">
        <Link href="/" className="text-[10px] text-fuchsia-300 hover:text-white">
          ← BACK TO HUB
        </Link>

        <h1 className="pixel-text mt-8 text-2xl leading-relaxed text-yellow-300 sm:text-4xl">
          VIDEO GAMES
        </h1>

        {games.length === 0 && (
          <p className="mt-10 text-xs leading-loose text-fuchsia-300">
            NO GAMES YET. INSERT COIN — add some in the Studio.
          </p>
        )}

        {library.length > 0 && (
          <section className="mt-12">
            <h2 className="text-sm text-emerald-300">▶ MY LIBRARY</h2>
            <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {library.map((g) => (
                <GameCard key={g._id} game={g} />
              ))}
            </div>
          </section>
        )}

        {wishlist.length > 0 && (
          <section className="mt-16">
            <h2 className="text-sm text-pink-400">★ WISHLIST</h2>
            <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {wishlist.map((g) => (
                <GameCard key={g._id} game={g} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
