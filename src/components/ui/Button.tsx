import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold-subtle';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  children,
  className = '',
  ...props
}) => {
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs font-semibold rounded-lg gap-1.5',
    md: 'px-4 py-2 text-sm font-semibold rounded-xl gap-2',
    lg: 'px-5 py-2.5 text-base font-semibold rounded-xl gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-gold-500 hover:bg-gold-600 text-charcoal-950 shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98] font-bold',
    secondary:
      'bg-charcoal-800 hover:bg-charcoal-700 text-white dark:bg-charcoal-700 dark:hover:bg-charcoal-650 transition-all duration-200 active:scale-[0.98]',
    outline:
      'border border-stone-300 hover:border-gold-500 bg-white dark:bg-charcoal-800 text-slate-700 dark:text-slate-200 hover:text-gold-700 dark:hover:text-gold-300 dark:border-charcoal-700 transition-all duration-200',
    ghost:
      'text-slate-600 hover:text-slate-900 hover:bg-stone-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-charcoal-800 transition-all duration-200',
    'gold-subtle':
      'bg-gold-500/15 hover:bg-gold-500/25 text-gold-800 dark:text-gold-300 border border-gold-500/30 transition-all duration-200',
  };

  return (
    <button
      className={`inline-flex items-center justify-center select-none cursor-pointer ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
};
