import { useToast } from '../../context/ToastContext';

const typeStyles = {
  success: { border: 'border-l-[#639922]', icon: '✓', iconBg: 'bg-[#EAF3DE] text-[#3B6D11]' },
  error:   { border: 'border-l-[#E24B4A]', icon: '✕', iconBg: 'bg-red-50 text-[#E24B4A]' },
  warning: { border: 'border-l-[#BA7517]', icon: '!', iconBg: 'bg-amber-50 text-[#BA7517]' },
  info:    { border: 'border-l-[#2563EB]', icon: 'i', iconBg: 'bg-blue-50 text-blue-600' },
};

const ToastItem = ({ toast, onDismiss }) => {
  const styles = typeStyles[toast.type] || typeStyles.info;
  return (
    <div
      className={`
        flex items-start gap-3 bg-white rounded-lg shadow-md border-l-4 border border-gray-100
        px-4 py-3 min-w-[280px] max-w-[360px]
        ${styles.border}
        ${toast.exiting ? 'toast-exit' : 'toast-enter'}
      `}
    >
      <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-bold ${styles.iconBg}`}>
        {styles.icon}
      </span>
      <p className="flex-1 text-[13px] text-[#2C2C2A] leading-snug">{toast.message}</p>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-[#9e9d99] hover:text-[#2C2C2A] flex-shrink-0 mt-0.5"
        aria-label="Dismiss notification"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
};

const ToastContainer = () => {
  const { toasts, dismissToast } = useToast();
  return (
    <div
      className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <ToastItem toast={toast} onDismiss={dismissToast} />
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
