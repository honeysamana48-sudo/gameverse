import Link from "next/link";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
}

export default function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="h-9 w-9 text-[var(--color-muted)]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.981-4.684 2.517-7.138a1.125 1.125 0 0 0-1.11-1.362H5.25M7.5 14.25 5.106 5.272M7.5 14.25 5.25 5.25M9.75 18.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm9 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
      </div>
      <h2 className="mt-6 font-display text-2xl font-bold text-[var(--color-ink)]">
        {title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
        {description}
      </p>
      <Link
        href={actionHref}
        className="clip-panel-sm mt-8 inline-flex items-center justify-center bg-[var(--color-violet)] px-8 py-3 font-heading text-sm font-semibold text-white shadow-[var(--shadow-glow-violet)] transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        {actionLabel}
      </Link>
    </div>
  );
}
