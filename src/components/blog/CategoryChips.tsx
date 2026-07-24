"use client";

const ALL = "Todas";

type CategoryChipsProps = {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
};

/** Fila de chips para filtrar por categoría. "Todas" + categorías presentes. */
export default function CategoryChips({
  categories,
  active,
  onChange,
}: CategoryChipsProps) {
  const chips = [ALL, ...categories];

  return (
    <div className="flex flex-wrap gap-3" role="group" aria-label="Filtrar por categoría">
      {chips.map((chip) => {
        const isActive = chip === active;
        return (
          <button
            key={chip}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(chip)}
            className={`rounded-full px-4 py-2 text-sm font-semibold tracking-wide outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-gold2/60 ${
              isActive
                ? "bg-gradient-to-r from-gold1 via-gold2 to-gold3 text-purple shadow-md"
                : "border border-purple/15 text-purpleSoft hover:border-gold2/50 hover:text-purple"
            }`}
          >
            {chip}
          </button>
        );
      })}
    </div>
  );
}

export { ALL };
