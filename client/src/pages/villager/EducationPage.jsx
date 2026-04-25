import { useState, useEffect } from 'react';
import { fetchResources } from '../../api/education.api';
import { useToast } from '../../context/ToastContext';
import VillagerLayout from '../../components/layout/VillagerLayout';
import SkeletonCard from '../../components/ui/SkeletonCard';
import { formatDateShort } from '../../utils/formatDate';
import { BookOpen, ExternalLink } from 'lucide-react';

const EmptyState = () => (
  <div className="flex flex-col items-center py-16 text-center">
    <BookOpen size={56} strokeWidth={1.5} color="#d4d0c8" className="mb-4" />
    <h3 className="text-[16px] font-medium text-[#2C2C2A]">No education resources available</h3>
    <p className="text-[13px] text-[#5F5E5A] mt-1">Resources will be added soon.</p>
  </div>
);

const EducationPage = () => {
  const { showToast } = useToast();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResources()
      .then(({ data }) => setResources(data.resources || []))
      .catch(() => showToast('Failed to load education resources', 'error'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <VillagerLayout>
      <div className="mb-6">
        <h1 className="text-[22px] font-medium text-[#2C2C2A]">Education</h1>
        <p className="text-[14px] text-[#5F5E5A] mt-1">Courses, scholarships, and learning resources</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : resources.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((res) => (
            <div key={res._id} className="bg-white rounded-xl border border-[#3B6D11]/10 p-5 flex flex-col gap-3 hover:border-[#3B6D11]/25 transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-400">
                <BookOpen size={20} strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-[15px] font-medium text-[#2C2C2A]">{res.title}</h3>
                <p className="text-[13px] text-[#5F5E5A] mt-0.5">{res.courseName}</p>
              </div>
              {res.description && (
                <p className="text-[13px] text-[#5F5E5A] leading-relaxed">{res.description}</p>
              )}
              <div className="mt-auto flex items-center justify-between">
                {res.resourceLink ? (
                  <a
                    href={res.resourceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] text-[#3B6D11] font-medium hover:underline flex items-center gap-1"
                  >
                    Open Resource
                    <ExternalLink size={12} strokeWidth={2.5} />
                  </a>
                ) : <span />}
                <span className="text-[11px] text-[#9e9d99]">{formatDateShort(res.updatedAt)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </VillagerLayout>
  );
};

export default EducationPage;
