import Image from "next/image";
import Isotype from "@/components/brand/Isotype";

type PostCoverProps = {
  coverImageUrl: string;
  alt: string;
  /** `sizes` para next/image cuando hay portada real. */
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/**
 * Portada de un post. Si `coverImageUrl` está vacío, muestra un fallback de
 * marca (isotipo dorado sobre fondo morado). El contenedor debe ser relativo
 * con dimensiones definidas por quien lo usa.
 */
export default function PostCover({
  coverImageUrl,
  alt,
  sizes,
  priority,
  className,
}: PostCoverProps) {
  if (coverImageUrl) {
    return (
      <Image
        src={coverImageUrl}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${className ?? ""}`}
      />
    );
  }

  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-purple to-purpleDeep ${className ?? ""}`}
      aria-hidden="true"
    >
      <Isotype className="h-1/2 w-1/2 max-h-32 max-w-32 opacity-80" title="" />
    </div>
  );
}
