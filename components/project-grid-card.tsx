"use client";

type ProjectGridCardProps = {
  category: string;
  title: string;
  tech: string;
  onSelect?: () => void;
};

export function ProjectGridCard({
  category,
  title,
  tech,
  onSelect,
}: ProjectGridCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="group relative flex min-h-[200px] flex-col border border-white/10 bg-black/40 p-5 text-left transition duration-300 hover:border-white/25 hover:bg-white/[0.03] sm:min-h-[220px] sm:p-6"
    >
      <p className="text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-muted">
        {category}
      </p>
      <h3 className="mt-3 font-heading text-xl font-normal leading-snug text-foreground sm:text-2xl">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-muted">{tech}</p>

      <span
        className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-foreground transition duration-300 group-hover:border-white/40 group-hover:bg-white/10"
        aria-hidden
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 12L12 4M12 4H6M12 4V10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}
