import { User } from 'lucide-react'

interface AvatarProps {
  src?: string
  alt: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  fallback?: string
}

export function Avatar({ src, alt, size = 'md', fallback }: AvatarProps) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  }

  const sizeClass = sizes[size]

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${sizeClass} rounded-full object-cover border-2 border-light-border dark:border-dark-border`}
        onError={(e) => {
          // Remove src on error to show fallback
          e.currentTarget.src = ''
        }}
      />
    )
  }

  return (
    <div
      className={`${sizeClass} rounded-full bg-brazil-green/10 text-brazil-green flex items-center justify-center font-semibold border-2 border-light-border dark:border-dark-border`}
    >
      {fallback ? (
        fallback.substring(0, 2).toUpperCase()
      ) : (
        <User className="w-1/2 h-1/2" />
      )}
    </div>
  )
}
