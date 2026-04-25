import { useState, useEffect } from 'react';
import { fetchResources } from '../../api/education.api';
import { useToast } from '../../context/ToastContext';
import VillagerLayout from '../../components/layout/VillagerLayout';
import SkeletonCard from '../../components/ui/SkeletonCard';
import { formatDateShort } from '../../utils/formatDate';

const EmptyState = () => (
  <div className="flex flex-col items-center py-16 text-center">
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#d4d0c8" strokeWidth="1.5" className="mb-4">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                </svg>
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
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
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
