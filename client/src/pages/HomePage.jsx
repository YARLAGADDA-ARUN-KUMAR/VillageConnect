import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ServiceCard from '../components/cards/ServiceCard';

const services = [
  {
    id: 'home-jobs',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
      </svg>
    ),
    title: 'Rural Jobs',
    description: 'Browse local job openings and employment opportunities in your area.',
    link: '/jobs',
  },
  {
    id: 'home-agriculture',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    ),
    title: 'Agriculture',
    description: 'Farming tips, crop advice, and government schemes to improve your yield.',
    link: '/agriculture',
  },
  {
    id: 'home-healthcare',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Healthcare',
    description: 'Access health services, clinics, and wellness information near you.',
    link: '/healthcare',
  },
  {
    id: 'home-education',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
    title: 'Education',
    description: 'Learning resources, courses, and scholarships for rural students.',
    link: '/education',
  },
  {
    id: 'home-grievance',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Grievance',
    description: 'Submit complaints and track their resolution status transparently.',
    link: '/grievance',
  },
];

const steps = [
  { n: '1', title: 'Register', desc: 'Create a free account in seconds — just name, email, and password.' },
  { n: '2', title: 'Access Services', desc: 'Browse jobs, agriculture tips, healthcare info, and education resources.' },
  { n: '3', title: 'Submit Grievance', desc: 'File complaints and track their progress until fully resolved.' },
];

const HomePage = () => (
  <div className="min-h-screen flex flex-col bg-[#F1EFE8]">
    <Navbar />

    {/* Hero */}
    <section id="hero" className="relative overflow-hidden bg-white border-b border-[#EAF3DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 flex flex-col items-center text-center gap-6">
        {/* Decorative leaf */}
        <div className="w-16 h-16 rounded-2xl bg-[#EAF3DE] flex items-center justify-center mb-2">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3B6D11" strokeWidth="1.8">
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
          </svg>
        </div>

        <div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-[#2C2C2A] leading-tight">
            Your village.{' '}
            <span className="text-[#3B6D11]">Connected.</span>
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-[16px] text-[#5F5E5A] leading-relaxed">
            VillageConnect brings essential services — jobs, agriculture, healthcare, education and
            grievance redressal — directly to every rural household.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <Link
            to="/register"
            id="hero-register-btn"
            className="px-6 py-3 bg-[#3B6D11] text-white text-[15px] font-medium rounded-lg hover:bg-[#27500A] transition-colors"
          >
            Get Started — It's Free
          </Link>
          <a
            href="#features"
            id="hero-learn-btn"
            className="px-6 py-3 bg-[#EAF3DE] text-[#3B6D11] text-[15px] font-medium rounded-lg hover:bg-[#d4e8bf] transition-colors"
          >
            Learn More ↓
          </a>
        </div>

        {/* Admin entry */}
        <p className="text-[13px] text-[#9e9d99]">
          Are you an admin?{' '}
          <Link
            to="/admin-login"
            id="hero-admin-login-link"
            className="text-[#3B6D11] font-medium hover:text-[#27500A] underline underline-offset-2"
          >
            Admin Login →
          </Link>
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-8 mt-8 pt-8 border-t border-[#EAF3DE] w-full">
          {[['5 Modules', 'All essential services'], ['100% Free', 'For all villagers'], ['Secure', 'JWT-protected data']].map(([val, label]) => (
            <div key={val} className="text-center">
              <p className="text-[20px] font-medium text-[#3B6D11]">{val}</p>
              <p className="text-[13px] text-[#5F5E5A]">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Features */}
    <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
      <div className="text-center mb-10">
        <h2 className="text-[26px] sm:text-[30px] font-medium text-[#2C2C2A]">Everything your village needs</h2>
        <p className="text-[15px] text-[#5F5E5A] mt-2">Five modules, one platform, zero complexity.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((s) => (
          <ServiceCard key={s.id} {...s} />
        ))}
      </div>
    </section>

    {/* How it works */}
    <section id="how-it-works" className="bg-white border-y border-[#EAF3DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center mb-12">
          <h2 className="text-[26px] sm:text-[30px] font-medium text-[#2C2C2A]">How it works</h2>
          <p className="text-[15px] text-[#5F5E5A] mt-2">Three simple steps to get started.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 relative">
          {steps.map((step, idx) => (
            <div key={step.n} className="flex-1 flex flex-col items-center text-center relative">
              {/* Connector line */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-7 left-[calc(50%+28px)] right-0 h-px bg-[#EAF3DE] z-0" />
              )}
              <div className="relative z-10 w-14 h-14 rounded-full bg-[#EAF3DE] border-2 border-[#3B6D11]/20 flex items-center justify-center text-[20px] font-medium text-[#3B6D11] mb-4">
                {step.n}
              </div>
              <h3 className="text-[16px] font-medium text-[#2C2C2A]">{step.title}</h3>
              <p className="text-[13px] text-[#5F5E5A] mt-2 max-w-xs leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/register"
            className="inline-flex px-8 py-3 bg-[#3B6D11] text-white text-[15px] font-medium rounded-lg hover:bg-[#27500A] transition-colors"
          >
            Create Your Account
          </Link>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default HomePage;
