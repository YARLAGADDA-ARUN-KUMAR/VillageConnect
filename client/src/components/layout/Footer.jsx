import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-white border-t border-[#EAF3DE] mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-[#5F5E5A]">
      <span>© {new Date().getFullYear()} VillageConnect. All rights reserved.</span>
      <div className="flex items-center gap-4">
        <Link to="/" className="hover:text-[#3B6D11] transition-colors">Home</Link>
        <Link to="/login" className="hover:text-[#3B6D11] transition-colors">Login</Link>
        <Link to="/register" className="hover:text-[#3B6D11] transition-colors">Register</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
