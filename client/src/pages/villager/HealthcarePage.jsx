import { useState, useEffect } from 'react';
import { fetchHealthInfo } from '../../api/healthcare.api';
import { useToast } from '../../context/ToastContext';
import VillagerLayout from '../../components/layout/VillagerLayout';
import SkeletonCard from '../../components/ui/SkeletonCard';
import { formatDateShort } from '../../utils/formatDate';

const EmptyState = () => (
  <div className="flex flex-col items-center py-16 text-center">
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#d4d0c8" strokeWidth="1.5" className="mb-4">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <h3 className="text-[16px] font-medium text-[#2C2C2A]">No healthcare info available</h3>
    <p className="text-[13px] text-[#5F5E5A] mt-1">Check back soon for health services near you.</p>
  </div>
);

const HealthcarePage = () => {
  const { showToast } = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHealthInfo()
      .then(({ data }) => setItems(data.info || []))
      .catch(() => showToast('Failed to load healthcare information', 'error'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <VillagerLayout>
      <div className="mb-6">
        <h1 className="text-[22px] font-medium text-[#2C2C2A]">Healthcare</h1>
        <p className="text-[14px] text-[#5F5E5A] mt-1">Health services and wellness information available in your region</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : items.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item._id} className="bg-white rounded-xl border border-[#3B6D11]/10 p-5 flex flex-col gap-3 hover:border-[#3B6D11]/25 transition-all">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-[15px] font-medium text-[#2C2C2A]">{item.title}</h3>
              <div>
                <p className="text-[11px] text-[#5F5E5A] uppercase tracking-wide mb-1">Services Available</p>
                <p className="text-[13px] text-[#2C2C2A] leading-relaxed">{item.services}</p>
              </div>
              {item.description && (
                <p className="text-[13px] text-[#5F5E5A] leading-relaxed">{item.description}</p>
              )}
              <p className="text-[11px] text-[#9e9d99] mt-auto">Updated {formatDateShort(item.updatedAt)}</p>
            </div>
          ))}
        </div>
      )}
    </VillagerLayout>
  );
};

export default HealthcarePage;
