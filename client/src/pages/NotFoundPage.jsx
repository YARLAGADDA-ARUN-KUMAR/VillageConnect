import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="min-h-screen bg-[#F1EFE8] flex items-center justify-center px-4">
    <div className="text-center">
      <p className="text-[100px] sm:text-[120px] font-medium text-[#EAF3DE] leading-none select-none">
        404
      </p>
      <div className="-mt-4">
        <h1 className="text-[24px] font-medium text-[#2C2C2A]">Page not found</h1>
        <p className="text-[15px] text-[#5F5E5A] mt-2 max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 mt-6 px-6 py-2.5 bg-[#3B6D11] text-white text-[14px] font-medium rounded-lg hover:bg-[#27500A] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  </div>
);

export default NotFoundPage;
