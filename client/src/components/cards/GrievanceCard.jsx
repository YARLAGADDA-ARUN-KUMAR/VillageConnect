import Badge from '../ui/Badge';
import { formatDateShort } from '../../utils/formatDate';

const GrievanceCard = ({ grievance }) => (
  <div className="bg-white rounded-xl border border-[#3B6D11]/10 p-4 flex flex-col gap-2">
    <p className="text-[14px] text-[#2C2C2A] line-clamp-2 leading-relaxed">
      {grievance.description}
    </p>
    <div className="flex items-center justify-between mt-1">
      <Badge status={grievance.status} />
      <span className="text-[12px] text-[#5F5E5A]">
        {formatDateShort(grievance.createdAt)}
      </span>
    </div>
  </div>
);

export default GrievanceCard;
