import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchJobs } from '../../api/job.api';
import { useToast } from '../../context/ToastContext';
import VillagerLayout from '../../components/layout/VillagerLayout';
import JobCard from '../../components/cards/JobCard';
import SkeletonCard from '../../components/ui/SkeletonCard';
import Input from '../../components/ui/Input';

const EmptyState = () => (
  <div className="flex flex-col items-center py-16 text-center">
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#d4d0c8" strokeWidth="1.5" className="mb-4">
      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
      <line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>
    </svg>
    <h3 className="text-[16px] font-medium text-[#2C2C2A]">No jobs found</h3>
    <p className="text-[13px] text-[#5F5E5A] mt-1">Try adjusting your search or check back later.</p>
  </div>
);

const JobsPage = () => {
  const { showToast } = useToast();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const debounceRef = useRef(null);

  const loadJobs = useCallback(async (params) => {
    setLoading(true);
    try {
      const { data } = await fetchJobs(params);
      setJobs(data.jobs || []);
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to load jobs', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  // Initial load
  useEffect(() => { loadJobs({}); }, []);

  // Debounced search
  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      loadJobs({ search: search || undefined, location: location || undefined });
    }, 400);
    return () => clearTimeout(debounceRef.current);
  }, [search, location]);

  return (
    <VillagerLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[22px] font-medium text-[#2C2C2A]">Job Listings</h1>
        <p className="text-[14px] text-[#5F5E5A] mt-1">Find employment opportunities in your area</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <Input
          id="jobs-search"
          placeholder="Search by job title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
        <Input
          id="jobs-location"
          placeholder="Filter by location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="flex-1 sm:max-w-[220px]"
        />
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : jobs.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job) => <JobCard key={job._id} job={job} />)}
        </div>
      )}
    </VillagerLayout>
  );
};

export default JobsPage;
