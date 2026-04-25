import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/auth.api';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Leaf, Eye, EyeOff } from 'lucide-react';

const RegisterPage = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (!form.confirmPassword) errs.confirmPassword = 'Please confirm your password';
    else if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: '' });
    setApiError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);

    setLoading(true);
    try {
      await registerUser({ name: form.name, email: form.email, password: form.password });
      showToast('Account created! Please sign in.', 'success');
      navigate('/login');
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Please try again.';
      setApiError(msg);
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F1EFE8] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#EAF3DE] flex items-center justify-center mx-auto mb-3">
            <Leaf size={24} color="#3B6D11" strokeWidth={2} />
          </div>
          <h1 className="text-[22px] font-medium text-[#2C2C2A]">Create your account</h1>
          <p className="text-[14px] text-[#5F5E5A] mt-1">Join VillageConnect today</p>
        </div>

        <div className="bg-white rounded-xl border border-[#3B6D11]/10 p-6 sm:p-8">
          {apiError && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-[13px] text-[#E24B4A]">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <Input
              id="reg-name"
              label="Full Name"
              name="name"
              type="text"
              placeholder="Your full name"
              value={form.name}
              onChange={handleChange}
              error={errors.name}
              autoComplete="name"
            />

            <Input
              id="reg-email"
              label="Email address"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
              autoComplete="email"
            />

            <Input
              id="reg-password"
              label="Password"
              name="password"
              type={showPass ? 'text' : 'password'}
              placeholder="At least 6 characters"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              rightElement={
                <button type="button" onClick={() => setShowPass(!showPass)} className="text-[#9e9d99] hover:text-[#5F5E5A]" tabIndex={-1}>
                  {showPass ? (
                    <EyeOff size={16} strokeWidth={2} />
                  ) : (
                    <Eye size={16} strokeWidth={2} />
                  )}
                </button>
              }
            />

            <Input
              id="reg-confirm-password"
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Repeat your password"
              value={form.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />



            <Button
              id="register-submit-btn"
              type="submit"
              loading={loading}
              disabled={loading}
              size="lg"
              className="w-full mt-2"
            >
              Create Account
            </Button>
          </form>

          <p className="text-center text-[13px] text-[#5F5E5A] mt-5">
            Already have an account?{' '}
            <Link to="/login" className="text-[#3B6D11] font-medium hover:text-[#27500A]">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
