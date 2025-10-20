import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { authAPI } from '../services/';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [reactivating, setReactivating] = useState(false);
  const [reactivateMsg, setReactivateMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await authAPI.login({ email, password });
      const token = res.data.token;
      localStorage.setItem('token', token);

      const profileRes = await authAPI.getProfile();
      const user = profileRes.data.user;

      const deactivated =
        user?.isActive === false ||
        user?.status === 'deactivated' ||
        (profileRes.data?.message && /deactiv/i.test(profileRes.data.message)) ||
        (user?.message && /deactiv/i.test(user.message));

      if (deactivated) {
        localStorage.removeItem('token');
        setError(
          'Your account has been deactivated. If you believe this is a mistake, contact support at support@example.com.'
        );
        setLoading(false);
        return;
      }

      setProfile(user);
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || '';
      if (/deactiv/i.test(msg) || err.response?.status === 423) {
        setError(
          'Your account has been deactivated. Contact support at support@example.com for help.'
        );
      } else {
        setError(msg || 'Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 via-white to-pink-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 sm:p-10 border border-gray-200">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
          Sign in to your account
        </h2>

        {error && (
          <p className="text-red-600 bg-red-50 border border-red-200 rounded-md p-3 mb-4 text-sm">
            {error}
          </p>
        )}

        {error && /deactiv/i.test(error) && (
          <div className="mb-4 text-center">
            <button
              onClick={async () => {
                setReactivating(true);
                setReactivateMsg('');
                try {
                  const res = await authAPI.reactivate({ email });
                  setReactivateMsg(
                    res.data?.message ||
                      'Reactivation request submitted. Please check your email.'
                  );
                } catch (err) {
                  setReactivateMsg(
                    'Could not request reactivation automatically. Please contact support@example.com'
                  );
                } finally {
                  setReactivating(false);
                }
              }}
              disabled={reactivating}
              className="inline-block mt-2 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg transition"
            >
              {reactivating ? 'Requesting...' : 'Request Reactivation'}
            </button>

            {reactivateMsg && (
              <div className="mt-2 text-sm text-gray-700">{reactivateMsg}</div>
            )}

            <div className="mt-2 text-sm text-gray-500">
              Or contact support: <a className="text-indigo-600" href="mailto:support@example.com">support@example.com</a>
            </div>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {profile && (
          <div className="mt-6 p-4 border rounded-md bg-green-50">
            <h3 className="font-semibold text-gray-800">Welcome, {profile.name}!</h3>
            <p className="text-gray-600">Email: {profile.email}</p>
            <p className="text-gray-600">Role: {profile.role}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;


