import { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export function Card({ children, hover = false, padding = 'md', className = '', ...props }: CardProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  }

  return (
    <div
      className={`
        bg-light-card dark:bg-dark-card
        border border-light-border dark:border-dark-border
        rounded-lg
        ${paddingClasses[padding]}
        ${hover ? 'transition-all duration-200 hover:shadow-lg hover:scale-[1.02]' : ''}
        ${className}
      `.trim()}
      {...props}
    >
      {children}
    </div>
  )
}
