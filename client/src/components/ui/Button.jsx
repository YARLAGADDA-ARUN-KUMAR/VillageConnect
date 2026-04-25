import Spinner from './Spinner';

const variantStyles = {
  primary: 'bg-[#3B6D11] text-white hover:bg-[#27500A] border border-[#3B6D11]',
  secondary: 'bg-[#EAF3DE] text-[#3B6D11] hover:bg-[#d4e8bf] border border-[#3B6D11]/30',
  danger: 'bg-[#E24B4A] text-white hover:bg-[#c73c3b] border border-[#E24B4A]',
  ghost: 'bg-transparent text-[#3B6D11] hover:bg-[#EAF3DE] border border-transparent',
  outline: 'bg-transparent text-[#3B6D11] hover:bg-[#EAF3DE] border border-[#3B6D11]',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-[13px] rounded-lg',
  md: 'px-4 py-2 text-[14px] rounded-lg',
  lg: 'px-6 py-2.5 text-[15px] rounded-lg',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  type = 'button',
  ...props
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`
        inline-flex items-center justify-center gap-2 font-medium
        transition-all duration-150 cursor-pointer select-none
        disabled:opacity-60 disabled:cursor-not-allowed
        ${variantStyles[variant] || variantStyles.primary}
        ${sizeStyles[size] || sizeStyles.md}
        ${className}
      `}
      {...props}
    >
      {loading && <Spinner size="sm" />}
      {children}
    </button>
  );
};

export default Button;
