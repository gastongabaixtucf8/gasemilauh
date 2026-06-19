import Link from "next/link";
import Image from "next/image";
import {sanityFetch} from "@/sanity/lib/fetch";
import {FIGURINES_QUERY, STRATEGIES_QUERY} from "@/sanity/lib/queries";
import {urlForImage} from "@/sanity/lib/image";
import type {Figurine, Strategy} from "@/sanity/types";

export const metadata = {title: "Warhammer — gasemilauh"};

const STATUS_LABELS: Record<string, string> = {
  painted: "Painted",
  owned: "Unpainted",
  wishlist: "Wishlist",
};

function FigurineCard({fig}: {fig: Figurine}) {
  const img = fig.photo
    ? urlForImage(fig.photo).width(500).height(500).fit("crop").url()
    : null;
  return (
    <article className="group overflow-hidden rounded-sm border border-amber-900/40 metal-sheen">
      <div className="relative aspect-square bg-black">
        {img ? (
          <Image
            src={img}
            alt={fig.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="320px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-amber-700">
            ✠
          </div>
        )}
        <span className="absolute right-2 top-2 rounded-sm bg-black/70 px-2 py-1 text-xs uppercase tracking-wider text-amber-300">
          {STATUS_LABELS[fig.status]}
        </span>
      </div>
      <div className="p-4">
        <h3
          className="gold-text text-xl font-bold tracking-wide"
          style={{fontFamily: "var(--font-gothic)"}}
        >
          {fig.name}
        </h3>
        {fig.faction && (
          <p className="text-sm text-amber-200/70">{fig.faction}</p>
        )}
        {fig.notes && <p className="mt-2 text-sm text-zinc-400">{fig.notes}</p>}
      </div>
    </article>
  );
}

export default async function WarhammerPage() {
  const [figurines, strategies] = await Promise.all([
    sanityFetch<Figurine[]>(FIGURINES_QUERY),
    sanityFetch<Strategy[]>(STRATEGIES_QUERY),
  ]);
  const collection = figurines.filter((f) => f.status !== "wishlist");
  const wishlist = figurines.filter((f) => f.status === "wishlist");

  return (
    <main className="bg-grimdark flex-1 text-zinc-200">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <Link
          href="/"
          className="text-sm uppercase tracking-widest text-amber-500/80 hover:text-amber-300"
        >
          ← Back to hub
        </Link>

        <header className="mt-8 border-y border-amber-900/40 py-8 text-center">
          <p className="text-amber-600">✠</p>
          <h1
            className="gold-text text-6xl font-black uppercase tracking-[0.15em] sm:text-7xl"
            style={{fontFamily: "var(--font-gothic)"}}
          >
            Warhammer
          </h1>
          <p className="mt-2 text-sm uppercase tracking-[0.3em] text-zinc-500">
            In the grim darkness, there is only war
          </p>
        </header>

        {figurines.length === 0 && strategies.length === 0 && (
          <p className="mt-10 text-center text-lg text-zinc-500">
            The armoury is empty — add figurines and strategies in the Studio.
          </p>
        )}

        {collection.length > 0 && (
          <section className="mt-12">
            <h2
              className="text-3xl uppercase tracking-widest text-amber-400"
              style={{fontFamily: "var(--font-gothic)"}}
            >
              The Collection
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {collection.map((f) => (
                <FigurineCard key={f._id} fig={f} />
              ))}
            </div>
          </section>
        )}

        {strategies.length > 0 && (
          <section className="mt-16">
            <h2
              className="text-3xl uppercase tracking-widest text-amber-400"
              style={{fontFamily: "var(--font-gothic)"}}
            >
              Battle Plans
            </h2>
            <div className="mt-6 space-y-5">
              {strategies.map((s) => (
                <article
                  key={s._id}
                  className="rounded-sm border border-amber-900/30 metal-sheen p-6"
                >
                  <div className="flex items-baseline justify-between">
                    <h3
                      className="gold-text text-2xl font-bold"
                      style={{fontFamily: "var(--font-gothic)"}}
                    >
                      {s.title}
                    </h3>
                    {s.faction && (
                      <span className="text-sm text-amber-200/60">
                        {s.faction}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 whitespace-pre-line text-zinc-300">
                    {s.body}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        {wishlist.length > 0 && (
          <section className="mt-16">
            <h2
              className="text-3xl uppercase tracking-widest text-amber-400"
              style={{fontFamily: "var(--font-gothic)"}}
            >
              Wishlist
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {wishlist.map((f) => (
                <FigurineCard key={f._id} fig={f} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
