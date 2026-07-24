import Link from "next/link";

type Variant = "gold" | "ghost" | "outline";

type ButtonAsButton = {
  as?: "button";
  href?: never;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonAsLink = {
  as: "link";
  href: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

type ButtonProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
} & (ButtonAsButton | ButtonAsLink);

const base =
  "inline-flex items-center justify-center rounded-full font-sans font-semibold tracking-wide " +
  "px-7 py-3 text-sm transition-all duration-300 outline-none " +
  "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gold1/80 focus-visible:ring-offset-transparent";

const variants: Record<Variant, string> = {
  gold:
    "bg-gradient-to-r from-gold1 via-gold2 to-gold3 text-purple shadow-md " +
    "hover:-translate-y-0.5 hover:shadow-xl hover:shadow-gold2/30",
  ghost:
    "border border-cream/40 text-cream backdrop-blur-sm " +
    "hover:border-cream/70 hover:bg-cream/10",
  outline:
    "border border-gold2 text-gold2 " +
    "hover:bg-gradient-to-r hover:from-gold1 hover:via-gold2 hover:to-gold3 hover:text-purple hover:border-transparent",
};

/** Botón/enlace de marca con variantes gold, ghost y outline. */
export default function Button({
  variant = "gold",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className ?? ""}`;

  if (props.as === "link") {
    // Se descarta `as` para que no llegue al DOM; el resto son atributos de <a>.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { as, href, ...rest } = props;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { as, ...rest } = props;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
