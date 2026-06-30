import { Star } from 'lucide-react'
import { memo } from 'react'

function StarRating({ rating, reviews }) {
  const full = Math.round(rating)
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < full ? 'fill-gold-400 text-gold-400' : 'fill-transparent text-plum-900/20 dark:text-cream-100/20'}
          />
        ))}
      </div>
      <span className="text-xs font-medium text-plum-900/70 dark:text-cream-100/70">
        {rating.toFixed(1)} {reviews != null && <span className="text-plum-900/40 dark:text-cream-100/40">({reviews})</span>}
      </span>
    </div>
  )
}

export default memo(StarRating)
