"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ShieldCheck, CheckCircle } from "lucide-react";
import { findUser } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const user = findUser(username, password);
      if (user) {
        setSuccess(true);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", user.username);
        localStorage.setItem("nama", user.nama);
        localStorage.setItem("role", user.role);
        
        setTimeout(() => {
          router.push("/overview");
        }, 500);
      } else {
        setError("Username atau password salah. Silakan coba lagi.");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-teal-600 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500 opacity-10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-teal-500 opacity-10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-blue-400 opacity-5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md px-6">
        {/* Card container with enhanced shadow */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20">
          
          <div className="p-8 sm:p-10">
            {/* Branding section */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-teal-500 rounded-full blur-lg opacity-75" />
                  <div className="relative bg-gradient-to-br from-blue-600 to-teal-500 p-2 rounded-full shadow-lg">
                    <img src="/Logo_BNN.svg" alt="Logo BNN" className="w-16 h-16" />
                  </div>
                </div>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                Manajemen Informasi Biomedis
              </h1>
              <p className="text-sm text-gray-500 mt-2 font-medium">
                Balai Rehabilitasi BNN Tanah Merah
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Username</label>
                <div className="relative">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={loading || success}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm bg-gray-50/50 hover:bg-gray-50"
                    placeholder="Masukkan username"
                    required
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading || success}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm pr-12 bg-gray-50/50 hover:bg-gray-50"
                    placeholder="Masukkan password"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading || success}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex gap-2 items-start animate-in fade-in duration-300">
                  <div className="text-red-500 mt-0.5">⚠️</div>
                  <span>{error}</span>
                </div>
              )}

              {/* Success message */}
              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm flex gap-2 items-start animate-in fade-in duration-300">
                  <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Login berhasil! Mengarahkan...</span>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading || success}
                className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-r-transparent rounded-full animate-spin" />
                    Memproses...
                  </div>
                ) : success ? (
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle size={18} />
                    Login Berhasil
                  </div>
                ) : (
                  "Masuk"
                )}
              </button>
            </form>

            {/* Demo credentials section */}
            <div className="mt-8 pb-2 border-t border-gray-200 pt-6">
              <p className="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wider">📋 Akun Demo Tersedia</p>
              <div className="space-y-2">
                <div className="bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-100 rounded-lg p-3 hover:shadow-md transition-shadow">
                  <p className="text-xs text-gray-600 font-medium mb-1">Administrator</p>
                  <div className="flex gap-1 items-center">
                    <code className="text-xs bg-white text-gray-700 px-2 py-1 rounded font-mono flex-1 border">admin / admin123</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
