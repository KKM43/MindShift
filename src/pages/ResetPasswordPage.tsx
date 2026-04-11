import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../lib/supabase";

export default function ResetPasswordPage() {
  const { updatePassword, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const handleRecovery = async () => {
      const hash = location.hash;
      const hasRecoveryToken =
        hash.includes("access_token") || hash.includes("type=recovery");

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        if (hasRecoveryToken || location.pathname === "/reset-password") {
          setReady(true);

          if (hash) {
            window.history.replaceState(null, "", "/reset-password");
          }
        } else {
          navigate("/journal", { replace: true });
        }
      } else {
        setReady(true);
      }
    };

    handleRecovery();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setReady(true);
      }
    });

    return () => subscription.unsubscribe();
  }, [location.hash, navigate]);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    const { error } = await updatePassword(password);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);

      setTimeout(async () => {
        await signOut();
        navigate("/auth", { replace: true });
      }, 1800);
    }
  };

  if (success) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-brand">
            <span className="brand-icon">✅</span>
            <h1 className="brand-name">Password Updated</h1>
            <p className="brand-tagline">
              Your password has been reset successfully.
              <br />
              Redirecting to login...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-brand">
            <span className="brand-icon">⏳</span>
            <h1 className="brand-name">Verifying link...</h1>
            <p className="brand-tagline">Just a second.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-brand">
          <span className="brand-icon">🔐</span>
          <h1 className="brand-name">New Password</h1>
          <p className="brand-tagline">
            Choose a strong password you'll remember.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleReset}>
          <div className="form-group">
            <label className="form-label">New Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="Min. 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="Same password again"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>

          {error && <p className="auth-error">⚠ {error}</p>}

          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? "Updating..." : "Set New Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
