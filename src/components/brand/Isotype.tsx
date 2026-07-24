"use client";

import { useId } from "react";

type IsotypeProps = {
  className?: string;
  /** Texto accesible; si se omite, el SVG se marca como decorativo. */
  title?: string;
};

/**
 * Isotipo LexMendez (luna creciente + globo + monograma LM + estrella) dibujado
 * en SVG inline con degradado dorado de marca. El id del gradiente es único por
 * instancia (useId) para evitar colisiones cuando aparece varias veces en la página.
 */
export default function Isotype({ className, title }: IsotypeProps) {
  const gradientId = `lm-gold-${useId()}`;
  const clipId = `lm-globe-clip-${useId()}`;

  return (
    <svg
      viewBox="0 0 600 600"
      className={className}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      xmlns="http://www.w3.org/2000/svg"
    >
      {title ? <title>{title}</title> : null}

      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ead08c" />
          <stop offset="55%" stopColor="#c9a24b" />
          <stop offset="100%" stopColor="#9a7729" />
        </linearGradient>
        <clipPath id={clipId}>
          <rect x="150" y="300" width="300" height="220" />
        </clipPath>
      </defs>

      {/* Luna creciente */}
      <path
        d="M 430 165 A 185 185 0 1 0 465 320"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="11"
        strokeLinecap="round"
      />

      {/* Estrella */}
      <path
        d="M452 148 l7.5 18 18 7.5 -18 7.5 -7.5 18 -7.5 -18 -18 -7.5 18 -7.5 z"
        fill={`url(#${gradientId})`}
      />

      {/* Globo (solo la porción inferior, recortada) */}
      <g
        clipPath={`url(#${clipId})`}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="2.6"
      >
        <circle cx="300" cy="300" r="140" />
        <ellipse cx="300" cy="300" rx="52" ry="140" />
        <ellipse cx="300" cy="300" rx="103" ry="140" />
        <ellipse cx="300" cy="300" rx="140" ry="140" />
        <ellipse cx="300" cy="300" rx="140" ry="58" />
        <ellipse cx="300" cy="300" rx="140" ry="105" />
        <line x1="160" y1="300" x2="440" y2="300" />
      </g>

      {/* Monograma: M */}
      <path
        d="M298 372 L298 210 L323 210 L360 300 L397 210 L422 210 L422 372 L400 372 L400 262 L369 335 L351 335 L320 262 L320 372 Z"
        fill={`url(#${gradientId})`}
      />

      {/* Monograma: L */}
      <path
        d="M246 200 L268 200 L268 350 L326 350 L326 372 L246 372 Z"
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
}
