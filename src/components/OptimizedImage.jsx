import { useState, memo } from 'react'

/**
 * OptimizedImage
 * - Reserves layout space (width/height ratio) to avoid CLS
 * - Lazy-loads off-screen images natively (loading="lazy")
 * - Shows a shimmer skeleton until the image has actually decoded
 */
function OptimizedImage({ src, alt, className = '', aspect = 'aspect-[4/3]', priority = false }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`relative overflow-hidden ${aspect} ${className}`}>
      {!loaded && <div className="skeleton absolute inset-0" />}
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  )
}

export default memo(OptimizedImage)
