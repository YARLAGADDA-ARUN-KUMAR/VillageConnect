import { Link } from 'react-router-dom';
import { Building2, MapPin, ChevronRight } from 'lucide-react';

const JobCard = ({ job }) => (
  <div className="
    bg-white rounded-xl border border-[#3B6D11]/10
    p-5 flex flex-col gap-3
    hover:border-[#3B6D11]/30 hover:shadow-sm transition-all duration-200
  ">
    <div className="flex items-start justify-between gap-2">
      <h3 className="text-[15px] font-medium text-[#2C2C2A] leading-snug">{job.title}</h3>
      {job.type && (
        <span className="shrink-0 text-[11px] bg-[#EAF3DE] text-[#3B6D11] px-2 py-0.5 rounded-full border border-[#3B6D11]/15">
          {job.type}
        </span>
      )}
    </div>

    <div className="flex items-center gap-3 text-[13px] text-[#5F5E5A]">
      <span className="flex items-center gap-1">
        <Building2 size={13} strokeWidth={2} />
        {job.company}
      </span>
      <span className="flex items-center gap-1">
        <MapPin size={13} strokeWidth={2} />
        {job.location}
      </span>
    </div>

    <p className="text-[13px] text-[#5F5E5A] leading-relaxed line-clamp-2">{job.description}</p>

    <Link
      to={`/jobs/${job._id}`}
      className="mt-auto self-start text-[13px] font-medium text-[#3B6D11] hover:text-[#27500A] flex items-center gap-1 transition-colors"
    >
      View Details
      <ChevronRight size={13} strokeWidth={2.5} />
    </Link>
  </div>
);

export default JobCard;
