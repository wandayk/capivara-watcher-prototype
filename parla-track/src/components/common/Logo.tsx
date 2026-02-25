import { Building2 } from 'lucide-react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
}

export function Logo({ size = 'md', showText = true }: LogoProps) {
  const sizes = {
    sm: { icon: 'w-6 h-6', text: 'text-lg' },
    md: { icon: 'w-8 h-8', text: 'text-2xl' },
    lg: { icon: 'w-12 h-12', text: 'text-4xl' },
  }

  const sizeClasses = sizes[size]

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Building2 className={`${sizeClasses.icon} text-brazil-green`} />
        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-brazil-yellow rounded-full" />
      </div>
      {showText && (
        <span className={`${sizeClasses.text} font-display font-bold text-brazil-green`}>
          ParlaTrack
        </span>
      )}
    </div>
  )
}
