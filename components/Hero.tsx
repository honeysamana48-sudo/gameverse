import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--color-border)]">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-void)] via-transparent to-[var(--color-void)]" />
      <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-[var(--color-violet)]/25 blur-[100px]" />
      <div className="absolute -right-24 top-40 h-80 w-80 rounded-full bg-[var(--color-cyan)]/20 blur-[110px]" />

      <div
        className="absolute inset-0 opacity-[0.35] mix-blend-overlay"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&q=60')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative mx-auto flex max-w-7xl flex-col items-start px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">

        {/* Badge */}
        <span className="animate-fade-in inline-flex items-center gap-2 rounded-full border border-[var(--color-violet)]/40 bg-[var(--color-violet)]/10 px-4 py-1.5 font-heading text-sm font-medium text-[var(--color-cyan)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-cyan)] animate-pulse-glow" />
          Up to 50% OFF this week
        </span>

        {/* Title */}
        <h1
          className="animate-fade-in mt-6 max-w-3xl font-display text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
          style={{ animationDelay: "80ms" }}
        >
          Buy PC Games <span className="text-gradient">Instantly</span>
        </h1>

        {/* Subtitle */}
        <p
          className="animate-fade-in mt-6 max-w-xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg"
          style={{ animationDelay: "160ms" }}
        >
          Instant digital delivery, unbeatable prices, secure payments,
          and 24×7 customer support. Get your favorite PC games in minutes.
        </p>

        {/* Buttons */}
        <div
          className="animate-fade-in mt-10 flex flex-wrap gap-4"
          style={{ animationDelay: "240ms" }}
        >
          {/* Browse */}
          <Link
            href="/games"
            className="clip-panel-sm inline-flex items-center justify-center bg-[var(--color-violet)] px-8 py-3.5 font-heading text-base font-semibold text-white shadow-[var(--shadow-glow-violet)] transition hover:scale-105"
          >
            🎮 Browse Games
          </Link>

          {/* Featured */}
          <Link
            href="#games"
            className="clip-panel-sm inline-flex items-center justify-center border border-[var(--color-cyan)] bg-[var(--color-cyan)]/10 px-8 py-3.5 font-heading text-base font-semibold text-[var(--color-cyan)] transition hover:bg-[var(--color-cyan)] hover:text-black hover:scale-105"
          >
            ⭐ Featured Games
          </Link>

          {/* Deals */}
          <Link
            href="#deals"
            className="clip-panel-sm inline-flex items-center justify-center border border-red-500 bg-red-500/10 px-8 py-3.5 font-heading text-base font-semibold text-red-400 transition hover:bg-red-500 hover:text-white hover:scale-105"
          >
            🔥 Hot Deals
          </Link>
        </div>

        {/* Stats */}
        <div
          className="animate-fade-in mt-14 grid w-full max-w-lg grid-cols-3 gap-6 border-t border-[var(--color-border)] pt-8"
          style={{ animationDelay: "320ms" }}
        >
          {[
            { value: "12K+", label: "Games Sold" },
            { value: "4.8/5", label: "Player Rating" },
            { value: "<5 min", label: "Avg. Delivery" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-2xl font-bold text-[var(--color-ink)] sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-[var(--color-muted)] sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}