import { Link } from 'react-router-dom';

const JobCard = ({ job }) => (
  <div className="
    bg-white rounded-xl border border-[#3B6D11]/10
    p-5 flex flex-col gap-3
    hover:border-[#3B6D11]/30 hover:shadow-sm transition-all duration-200
  ">
    <div className="flex items-start justify-between gap-2">
      <h3 className="text-[15px] font-medium text-[#2C2C2A] leading-snug">
        {job.title}
      </h3>
      {job.type && (
        <span className="shrink-0 text-[11px] bg-[#EAF3DE] text-[#3B6D11] px-2 py-0.5 rounded-full border border-[#3B6D11]/15">
          {job.type}
        </span>
      )}
    </div>

    <div className="flex items-center gap-3 text-[13px] text-[#5F5E5A]">
      <span className="flex items-center gap-1">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        </svg>
        {job.company}
      </span>
      <span className="flex items-center gap-1">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        {job.location}
      </span>
    </div>

    <p className="text-[13px] text-[#5F5E5A] leading-relaxed line-clamp-2">
      {job.description}
    </p>

    <Link
      to={`/jobs/${job._id}`}
      className="
        mt-auto self-start text-[13px] font-medium text-[#3B6D11]
        hover:text-[#27500A] flex items-center gap-1 transition-colors
      "
    >
      View Details
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  </div>
);

export default JobCard;
