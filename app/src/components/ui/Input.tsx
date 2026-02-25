import { InputHTMLAttributes, ReactNode, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-1.5">
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-light-muted dark:text-dark-muted">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            className={`
              w-full px-4 py-2 rounded-lg
              bg-light-card dark:bg-dark-card
              border ${error ? 'border-red-500' : 'border-light-border dark:border-dark-border'}
              text-light-text dark:text-dark-text
              placeholder:text-light-muted/50 dark:placeholder:text-dark-muted/50
              focus:outline-none focus:ring-2 focus:ring-brazil-green focus:border-transparent
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200
              ${leftIcon ? 'pl-10' : ''}
              ${rightIcon ? 'pr-10' : ''}
              ${className}
            `.trim()}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-light-muted dark:text-dark-muted">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}

        {helperText && !error && (
          <p className="mt-1 text-sm text-light-muted dark:text-dark-muted">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
