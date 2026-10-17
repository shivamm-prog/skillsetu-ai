import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'white' | 'cream' | 'subtle' | 'gold-tint' | 'outline';
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'white',
  hoverEffect = false,
  ...rest
}) => {
  const variantStyles = {
    white: 'bg-white dark:bg-charcoal-800 border-stone-200/80 dark:border-charcoal-700 shadow-soft',
    cream: 'bg-[#FCFAF5] dark:bg-charcoal-850 border-stone-200/90 dark:border-charcoal-750 shadow-soft',
    subtle: 'bg-cream-50/60 dark:bg-charcoal-800/60 border-stone-200/60 dark:border-charcoal-700',
    'gold-tint': 'bg-gradient-to-br from-gold-50/80 to-cream-100/90 dark:from-charcoal-800 dark:to-charcoal-850 border-gold-300/40 dark:border-gold-500/25 shadow-soft',
    outline: 'bg-transparent border-dashed border-stone-300 dark:border-charcoal-700',
  };

  const hoverStyle = hoverEffect
    ? 'transition-all duration-300 hover:shadow-premium hover:-translate-y-0.5 hover:border-gold-400/50 dark:hover:border-gold-500/40'
    : '';

  return (
    <div
      className={`rounded-2xl border p-5 text-slate-800 dark:text-slate-100 ${variantStyles[variant]} ${hoverStyle} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};
