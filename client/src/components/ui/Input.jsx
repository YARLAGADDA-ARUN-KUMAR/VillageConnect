const Input = ({
  label,
  error,
  id,
  type = 'text',
  className = '',
  containerClass = '',
  rightElement,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1 ${containerClass}`}>
      {label && (
        <label
          htmlFor={id}
          className="text-[13px] font-medium text-[#2C2C2A]"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={type}
          className={`
            w-full px-3 py-2.5 text-[14px] text-[#2C2C2A]
            bg-white border rounded-lg transition-all duration-150
            placeholder:text-[#9e9d99]
            focus:outline-none focus:ring-2 focus:ring-[#3B6D11]/30 focus:border-[#3B6D11]
            ${error ? 'border-[#E24B4A] focus:ring-[#E24B4A]/20' : 'border-[#d4d0c8]'}
            ${rightElement ? 'pr-10' : ''}
            ${className}
          `}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
      {error && (
        <p className="text-[12px] text-[#E24B4A] mt-0.5">{error}</p>
      )}
    </div>
  );
};

export default Input;
