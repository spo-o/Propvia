import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useToastStore } from "../store/toastStore";
import { signup as backendSignup, login as backendLogin } from "../api/auth";
import { Building2, Lock, Mail, Check, X } from "lucide-react";

interface UserProfile {
  firstName: string;
  lastName: string;
  phone: string;
  company: string;
  role: string;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(false);

  const [profile, setProfile] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    phone: "",
    company: "",
    role: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const setAuth = useAuthStore(s => s.setAuth);
  const showToast = useToastStore(s => s.showToast);
  const from = (location.state as any)?.from?.pathname || "/property-explorer";

  useEffect(() => {
    setIsPasswordValid(password.length >= 8);
    setDoPasswordsMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  const toggleMode = () => {
    setIsSignUp(v => !v);
    setError("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isSignUp) {
      if (!isPasswordValid)
        return setError("Password must be at least 8 characters long.");
      if (!doPasswordsMatch) return setError("Passwords do not match.");
      if (!profile.firstName || !profile.lastName)
        return setError("First & last name are required.");
    }

    setLoading(true);
    try {
      if (isSignUp) {
        await backendSignup(email, password, profile);
        showToast("Account created! Please login.", "success");
        setIsSignUp(false);
      } else {
        const resp = await backendLogin(email, password);
        const u = resp.user as any;
        const token = resp.session.access_token;
        const userData = {
          id: u.id,
          email: u.email,
          full_name: u.full_name,
          company: u.company,
          phone: u.phone,
          role: u.role,
        };
        setAuth(userData, token);
        showToast("Logged in successfully!", "success");
        navigate(from);
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      setError(err.message || "Authentication failed");
      showToast(err.message || "Error", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-10 mt-14">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <Building2 className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            {isSignUp ? "Create your account" : "Sign in to your account"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={toggleMode}
              className="text-blue-600 hover:underline font-medium"
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </button>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-5">
          {isSignUp && (
            <>
              <h3 className="text-gray-700 font-medium">Profile Information</h3>
              {/* name */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  value={profile.firstName}
                  onChange={e =>
                    setProfile({ ...profile, firstName: e.target.value })
                  }
                  placeholder="First Name"
                  className="input p-2 rounded-lg border"
                />
                <input
                  type="text"
                  required
                  value={profile.lastName}
                  onChange={e =>
                    setProfile({ ...profile, lastName: e.target.value })
                  }
                  placeholder="Last Name"
                  className="input p-2 rounded-lg border"
                />
              </div>
              {/* number & company */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="tel"
                  required
                  value={profile.phone}
                  onChange={e =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                  placeholder="Phone Number"
                  className="input p-2 rounded-lg border"
                />
                <input
                  type="text"
                  required
                  value={profile.company}
                  onChange={e =>
                    setProfile({ ...profile, company: e.target.value })
                  }
                  placeholder="Company"
                  className="input p-2 rounded-lg border"
                />
              </div>
              <select
                required
                value={profile.role}
                onChange={e => setProfile({ ...profile, role: e.target.value })}
                className="input w-full p-2 rounded-lg border"
              >
                <option value="">Select your role</option>
                <option value="investor">Investor</option>
                <option value="small_business">Small Business Owner</option>
                <option value="government">Government Official</option>
                <option value="real_estate">Real Estate Agent</option>
                <option value="personal">Personal Use</option>
                <option value="other">Other</option>
              </select>
            </>
          )}

          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email address"
            className="input w-full border rounded-lg p-2"
          />

          <div className="relative">
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder={isSignUp ? "New Password (min 8 chars)" : "Password"}
              className={`input w-full border rounded-lg p-2 pr-10 ${
                isSignUp && password
                  ? isPasswordValid
                    ? "border-green-300"
                    : "border-red-300"
                  : ""
              }`}
            />
            {isSignUp && password && (
              <span className="absolute inset-y-0 right-3 flex items-center">
                {isPasswordValid ? (
                  <Check className="text-green-500 h-5 w-5" />
                ) : (
                  <X className="text-red-500 h-5 w-5" />
                )}
              </span>
            )}
          </div>

          {isSignUp && (
            <div className="relative">
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className={`input w-full p-2 rounded-lg border pr-10 ${
                  confirmPassword
                    ? doPasswordsMatch
                      ? "border-green-300"
                      : "border-red-300"
                    : ""
                }`}
              />
              {confirmPassword && (
                <span className="absolute inset-y-0 right-3 flex items-center">
                  {doPasswordsMatch ? (
                    <Check className="text-green-500 h-5 w-5" />
                  ) : (
                    <X className="text-red-500 h-5 w-5" />
                  )}
                </span>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={
              loading || (isSignUp && (!isPasswordValid || !doPasswordsMatch))
            }
            className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? (
              <span className="flex justify-center items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Processing...
              </span>
            ) : isSignUp ? (
              "Sign up"
            ) : (
              "Sign in"
            )}
          </button>

          {!isSignUp && (
            <div className="flex items-center justify-between text-sm text-gray-600">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-600"
                />
                <span>Remember me</span>
              </label>
              <Link
                to="/forgotPassword"
                className="text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          )}
        </form>
      </div>

      {/* Style override */}
      <style>{`
        .input {
          @apply w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
        }
      `}</style>
    </div>
  );
}
