const AdminTopbar = ({ onMenuClick, title }) => (
  <header className="sticky top-0 z-30 bg-white border-b border-[#EAF3DE] h-14 flex items-center px-4 sm:px-6 gap-4">
    <button
      id="admin-menu-btn"
      onClick={onMenuClick}
      className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg hover:bg-[#EAF3DE] text-[#5F5E5A] transition-colors"
      aria-label="Open menu"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" />
      </svg>
    </button>
    <h1 className="text-[15px] font-medium text-[#2C2C2A]">{title || 'Admin'}</h1>
  </header>
);

export default AdminTopbar;
