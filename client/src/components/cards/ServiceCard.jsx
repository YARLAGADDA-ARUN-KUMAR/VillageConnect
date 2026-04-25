import { Link } from 'react-router-dom';

const ServiceCard = ({ icon, title, description, link, id }) => (
  <Link
    to={link}
    id={id}
    className="
      group flex flex-col gap-3 p-5 bg-white rounded-xl
      border border-[#3B6D11]/10
      hover:border-[#3B6D11]/30 hover:bg-[#EAF3DE]/40
      transition-all duration-200
    "
  >
    <div className="w-11 h-11 rounded-xl bg-[#EAF3DE] flex items-center justify-center text-[#3B6D11]">
      {icon}
    </div>
    <div>
      <h3 className="text-[15px] font-medium text-[#2C2C2A] group-hover:text-[#3B6D11] transition-colors">
        {title}
      </h3>
      <p className="text-[13px] text-[#5F5E5A] mt-1 leading-relaxed">{description}</p>
    </div>
    <div className="mt-auto pt-1 flex items-center gap-1.5 text-[13px] text-[#3B6D11] font-medium">
      View Module
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  </Link>
);

export default ServiceCard;
