const Card = ({ children, className = '', padding = 'p-5' }) => (
  <div
    className={`
      bg-white rounded-xl border border-[#3B6D11]/10
      ${padding} ${className}
    `}
  >
    {children}
  </div>
);

export default Card;
