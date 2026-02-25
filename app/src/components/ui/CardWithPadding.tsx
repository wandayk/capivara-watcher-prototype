import * as React from "react"
import { cn } from "@/lib/utils"
import { Card as ShadcnCard } from "./card"

interface CardWithPaddingProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export function Card({
  children,
  hover = false,
  padding = 'md',
  className = '',
  ...props
}: CardWithPaddingProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  }

  return (
    <ShadcnCard
      className={cn(
        paddingClasses[padding],
        hover && 'transition-all duration-200 hover:shadow-lg hover:scale-[1.02] cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </ShadcnCard>
  )
}
