import { useState } from "react";

interface ServiceHeroImageProps {
  src: string;
  alt: string;
  video?: string;
}

export function ServiceHeroImage({ src, alt, video }: ServiceHeroImageProps) {
  const [loading, setLoading] = useState(true);

  if (video) {
    return (
      <video
        src={video}
        controls
        className="h-full w-full object-cover"
        poster={src || undefined}
      >
        Ваш браузер не поддерживает воспроизведение видео.
      </video>
    );
  }

  return (
    <>
      {loading && src && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface-muted">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-border border-t-primary" />
        </div>
      )}
      {src && (
        <img
          src={src}
          alt={alt}
          className={`h-full w-full object-cover transition-opacity duration-300 ${loading ? "opacity-0" : "opacity-100"}`}
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
          ref={(el) => {
            if (el?.complete) setLoading(false);
          }}
        />
      )}
    </>
  );
}
