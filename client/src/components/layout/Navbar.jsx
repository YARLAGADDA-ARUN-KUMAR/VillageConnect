import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LeafIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3B6D11" strokeWidth="2">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

const navLinks = [
  { to: '/dashboard', label: 'Home' },
  { to: '/jobs', label: 'Jobs' },
  { to: '/agriculture', label: 'Agriculture' },
  { to: '/healthcare', label: 'Healthcare' },
  { to: '/education', label: 'Education' },
  { to: '/grievance', label: 'Grievance' },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setDropdownOpen(false);
  };

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#EAF3DE]">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <LeafIcon />
          <span className="text-[17px] font-medium text-[#27500A] tracking-tight">VillageConnect</span>
        </Link>

        {/* Desktop Nav Links */}
        {user && (
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-1.5 text-[14px] rounded-lg transition-colors ${
                    isActive
                      ? 'text-[#3B6D11] font-medium bg-[#EAF3DE]'
                      : 'text-[#5F5E5A] hover:text-[#3B6D11] hover:bg-[#EAF3DE]/60'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        )}

        {/* Right side */}
        <div className="flex items-center gap-3 ml-auto">
          {user ? (
            <div className="relative">
              <button
                id="user-avatar-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-[#EAF3DE] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#3B6D11] text-white text-[12px] font-medium flex items-center justify-center">
                  {initials}
                </div>
                <span className="hidden sm:block text-[13px] font-medium text-[#2C2C2A] max-w-[120px] truncate">
                  {user.name}
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" />
                </svg>
              </button>

              {dropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl border border-[#EAF3DE] shadow-lg z-20 py-1">
                    <Link
                      to="/profile"
                      className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-[#2C2C2A] hover:bg-[#EAF3DE] transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                      </svg>
                      My Profile
                    </Link>
                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-[#2C2C2A] hover:bg-[#EAF3DE] transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                          <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
                        </svg>
                        Admin Panel
                      </Link>
                    )}
                    <div className="border-t border-[#EAF3DE] mt-1 pt-1">
                      <button
                        id="logout-btn"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-[#E24B4A] hover:bg-red-50 transition-colors"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" strokeLinecap="round"/>
                        </svg>
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 text-[14px] font-medium text-[#3B6D11] hover:bg-[#EAF3DE] rounded-lg transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-[14px] font-medium bg-[#3B6D11] text-white rounded-lg hover:bg-[#27500A] transition-colors"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-btn"
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-[#EAF3DE] text-[#5F5E5A] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#EAF3DE] bg-white px-4 py-3 flex flex-col gap-1">
          {user ? (
            <>
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2.5 text-[14px] rounded-lg transition-colors ${
                      isActive ? 'text-[#3B6D11] font-medium bg-[#EAF3DE]' : 'text-[#5F5E5A]'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="border-t border-[#EAF3DE] pt-2 mt-1 flex flex-col gap-1">
                <Link to="/profile" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 text-[14px] text-[#2C2C2A] rounded-lg hover:bg-[#EAF3DE]">
                  My Profile
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 text-[14px] text-[#2C2C2A] rounded-lg hover:bg-[#EAF3DE]">
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => { handleLogout(); setMobileOpen(false); }}
                  className="px-3 py-2.5 text-[14px] text-[#E24B4A] rounded-lg hover:bg-red-50 text-left"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-2 pt-1">
              <Link to="/login" onClick={() => setMobileOpen(false)} className="px-4 py-2.5 text-[14px] font-medium text-center text-[#3B6D11] border border-[#3B6D11] rounded-lg">
                Login
              </Link>
              <Link to="/register" onClick={() => setMobileOpen(false)} className="px-4 py-2.5 text-[14px] font-medium text-center bg-[#3B6D11] text-white rounded-lg">
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
