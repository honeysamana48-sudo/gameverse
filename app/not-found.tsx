import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center overflow-hidden px-4 py-24 text-center">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-violet)]/20 blur-[100px]" />

      <p className="relative font-display text-8xl font-extrabold text-gradient sm:text-9xl">
        404
      </p>
      <h1 className="relative mt-4 font-display text-2xl font-bold text-[var(--color-ink)] sm:text-3xl">
        Game Not Found
      </h1>
      <p className="relative mt-3 max-w-md text-sm leading-relaxed text-[var(--color-muted)]">
        Looks like this level doesn&apos;t exist. The page you&apos;re looking
        for may have been moved, deleted, or never spawned in the first place.
      </p>

      <Link
        href="/"
        className="clip-panel-sm relative mt-8 inline-flex items-center justify-center bg-[var(--color-violet)] px-8 py-3.5 font-heading text-base font-semibold text-white shadow-[var(--shadow-glow-violet)] transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        Return to Home
      </Link>
    </div>
  );
}
