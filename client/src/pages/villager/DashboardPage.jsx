import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { fetchMyGrievances } from '../../api/grievance.api';
import VillagerLayout from '../../components/layout/VillagerLayout';
import Badge from '../../components/ui/Badge';
import ServiceCard from '../../components/cards/ServiceCard';

const services = [
  {
    id: 'dash-jobs',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>,
    title: 'Jobs',
    description: 'Browse and apply for local job opportunities.',
    link: '/jobs',
  },
  {
    id: 'dash-agriculture',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></svg>,
    title: 'Agriculture',
    description: 'Farming tips, government schemes, and crop advice.',
    link: '/agriculture',
  },
  {
    id: 'dash-healthcare',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    title: 'Healthcare',
    description: 'Health services and wellness information nearby.',
    link: '/healthcare',
  },
  {
    id: 'dash-education',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
    title: 'Education',
    description: 'Courses, scholarships, and learning resources.',
    link: '/education',
  },
  {
    id: 'dash-grievance',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round"/></svg>,
    title: 'Grievance',
    description: 'File complaints and track resolution status.',
    link: '/grievance',
  },
];

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
};

const DashboardPage = () => {
  const { user } = useAuth();
  const [latestGrievance, setLatestGrievance] = useState(null);
  const [grievanceLoading, setGrievanceLoading] = useState(true);

  useEffect(() => {
    fetchMyGrievances()
      .then(({ data }) => setLatestGrievance(data.grievances?.[0] || null))
      .catch(() => {})
      .finally(() => setGrievanceLoading(false));
  }, []);

  const today = new Intl.DateTimeFormat('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(new Date());

  return (
    <VillagerLayout>
      {/* Welcome banner */}
      <div className="bg-white rounded-xl border border-[#3B6D11]/10 px-6 py-5 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-[20px] font-medium text-[#2C2C2A]">
              {getGreeting()}, <span className="text-[#3B6D11]">{user?.name?.split(' ')[0]}</span> 👋
            </h1>
            <p className="text-[13px] text-[#5F5E5A] mt-0.5">{today}</p>
          </div>

          {/* Latest grievance status widget */}
          <div className="flex items-center gap-3 bg-[#F1EFE8] rounded-lg px-4 py-3">
            <div>
              <p className="text-[12px] text-[#5F5E5A]">Latest Grievance</p>
              {grievanceLoading ? (
                <div className="skeleton h-4 w-24 mt-1" />
              ) : latestGrievance ? (
                <Badge status={latestGrievance.status} />
              ) : (
                <span className="text-[13px] text-[#5F5E5A]">None filed</span>
              )}
            </div>
            <Link
              to="/grievance"
              className="text-[12px] text-[#3B6D11] font-medium hover:underline"
            >
              View →
            </Link>
          </div>
        </div>
      </div>

      {/* Service cards */}
      <h2 className="text-[16px] font-medium text-[#2C2C2A] mb-4">Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((s) => (
          <ServiceCard key={s.id} {...s} />
        ))}
      </div>
    </VillagerLayout>
  );
};

export default DashboardPage;
