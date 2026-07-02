import { forwardRef } from 'react';

const base =
  'inline-flex items-center gap-2 justify-center font-bold text-lg leading-none ' +
  'min-h-[44px] px-s3 py-s1 rounded-pill border-2 border-transparent no-underline ' +
  'transition-all duration-instant cursor-pointer ' +
  'disabled:opacity-45 disabled:cursor-not-allowed disabled:pointer-events-none';

const variants = {
  primary:
    'bg-surface-muted text-on-accent hover:bg-[#ffd75e] active:translate-y-px active:bg-[#e6a91f]',
  secondary:
    'bg-transparent text-text-primary border-border hover:border-surface-muted ' +
    'hover:text-surface-muted active:translate-y-px',
};

const Button = forwardRef(function Button(
  { as: Tag = 'button', variant = 'primary', loading = false, error = false, children, className = '', ...props },
  ref
) {
  const errorCls = error ? 'border-error text-error' : '';
  return (
    <Tag
      ref={ref}
      className={`${base} ${variants[variant]} ${errorCls} ${className}`}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="w-[14px] h-[14px] border-2 border-current border-t-transparent rounded-full"
          style={{ animation: 'spin 300ms linear infinite' }}
        />
      )}
      {children}
    </Tag>
  );
});

export default Button;