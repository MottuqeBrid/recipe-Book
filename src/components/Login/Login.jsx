import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import useAuth from "../../providers/useAuth";

const Login = () => {
  const { auth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message || "Login failed!");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Google login successful!");
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
      toast.error("Google login failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="text-sm text-right text-blue-500 hover:underline cursor-pointer">
            Forgot Password?
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>

        <div className="divider">OR</div>

        <button onClick={handleGoogleLogin} className="btn btn-outline w-full">
          Continue with Google
        </button>

        <p className="mt-4 text-sm text-center">
          Don't have an account?
          <Link to="/register" className="text-blue-500 ml-1 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
