import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'whatsapp';

interface BaseProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

const variantClass: Record<Variant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  whatsapp: 'btn-whatsapp',
};

type ButtonProps = BaseProps & ComponentPropsWithoutRef<'button'>;

export function Button({ variant = 'primary', className = '', children, ...rest }: ButtonProps) {
  return (
    <button className={`${variantClass[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

type LinkButtonProps = BaseProps & ComponentPropsWithoutRef<'a'>;

export function LinkButton({ variant = 'primary', className = '', children, ...rest }: LinkButtonProps) {
  return (
    <a className={`${variantClass[variant]} ${className}`} {...rest}>
      {children}
    </a>
  );
}
