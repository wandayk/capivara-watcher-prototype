import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar as ShadcnAvatar, AvatarFallback, AvatarImage } from "./avatar"

interface AvatarWithImageProps {
  src?: string
  alt: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  fallback: string
  className?: string
}

export function Avatar({
  src,
  alt,
  size = 'md',
  fallback,
  className,
}: AvatarWithImageProps) {
  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg',
  }

  return (
    <ShadcnAvatar className={cn(sizeClasses[size], className)}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
        {fallback}
      </AvatarFallback>
    </ShadcnAvatar>
  )
}
