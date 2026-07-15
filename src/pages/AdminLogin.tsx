import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginAdmin } from '../services/api';
import Toast from '../components/Toast';
import registerImage from '../assets/adminleft.jpg';
import { User, Lock } from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setToast({ message: 'Please enter username and password', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      const response = await loginAdmin(username, password);
      localStorage.setItem('admin_token', response.data.token);
      localStorage.setItem('admin_username', response.data.username);
      setToast({ message: 'Login successful!', type: 'success' });
      setTimeout(() => navigate('/admin/dashboard'), 500);
    } catch (err: any) {
      const message = err.response?.data?.message || 'Login failed. Please try again.';
      setToast({ message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: string) => `w-full pl-11 pr-4 py-3 rounded-xl border-2 bg-white/90 transition-all duration-200 text-sm outline-none ${field ? 'border-gray-200 focus:border-maroon-400 focus:ring-2 focus:ring-maroon-100' : ''}`;
  const iconWrap = 'absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none';

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-3 py-6 sm:p-6">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="w-full max-w-5xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_40px_rgba(120,0,20,0.08)] border border-white/60 overflow-hidden flex flex-col md:flex-row">
        {/* Left Side: Image */}
        <div className="hidden md:block md:w-[40%] relative min-h-[500px]">
          <img
            src={registerImage}
            alt="Bhakthiyum Bharathamum"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 p-5 sm:p-6 md:p-10">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4 md:hidden">🪔</div>
            <h1 className="text-2xl font-bold text-maroon-800">Admin Login</h1>
            <p className="text-gray-500 text-sm mt-1">Bhakthiyum Bharathamum 2026</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <div className={iconWrap}><User className="w-5 h-5" /></div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className={inputClass('username')}
              />
            </div>

            <div className="relative">
              <div className={iconWrap}><Lock className="w-5 h-5" /></div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className={inputClass('password')}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-maroon-700 to-maroon-800 text-white py-3.5 rounded-xl font-bold hover:from-maroon-800 hover:to-maroon-900 transition-all disabled:opacity-50 shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Logging in...
                </span>
              ) : (
                'Login'
              )}
            </button>

            <div className="text-center mt-4">
              <Link to="/admin/forgot-password" className="text-sm text-maroon-700 hover:underline">
                Forgot Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
