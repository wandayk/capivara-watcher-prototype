import * as React from "react"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button as ShadcnButton, ButtonProps } from "./button"

interface ButtonCompatProps extends Omit<ButtonProps, 'variant' | 'size'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'default' | 'destructive' | 'link'
  size?: 'sm' | 'md' | 'lg' | 'default' | 'icon'
  isLoading?: boolean
  fullWidth?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonCompatProps>(
  ({ variant = 'default', size = 'default', isLoading, fullWidth, className, children, disabled, ...props }, ref) => {
    // Mapear variants antigas para novas
    const mappedVariant = variant === 'primary' ? 'default'
      : variant === 'danger' ? 'destructive'
      : variant as 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'

    // Mapear sizes antigos para novos
    const mappedSize = size === 'md' ? 'default' : size as 'default' | 'sm' | 'lg' | 'icon'

    return (
      <ShadcnButton
        ref={ref}
        variant={mappedVariant}
        size={mappedSize}
        className={cn(
          fullWidth && 'w-full',
          variant === 'primary' && 'bg-primary hover:bg-primary/90 text-primary-foreground',
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </ShadcnButton>
    )
  }
)

Button.displayName = 'Button'
