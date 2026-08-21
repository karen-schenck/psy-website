type EditorialImageProps = {
  src: string
  alt: string
  caption?: string
  ratio?: string
  className?: string
}

/**
 * Photo slot for the editorial direction: renders as a CSS background rather
 * than an <img>, so a not-yet-sourced photo shows the beige ground instead
 * of a broken-image icon. Drop the real file at `src` and it appears as-is.
 */
export function EditorialImage({ src, alt, caption, ratio = "4 / 5", className }: EditorialImageProps) {
  return (
    <figure className={className}>
      <div
        role="img"
        aria-label={alt}
        className="editorial-image"
        style={{ aspectRatio: ratio, backgroundImage: `url(${src})` }}
      />
      {caption ? <figcaption className="editorial-caption">{caption}</figcaption> : null}
    </figure>
  )
}
