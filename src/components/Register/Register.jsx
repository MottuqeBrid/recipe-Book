import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";
import useAuth from "../../providers/useAuth";

const Register = () => {
  const { auth } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    // Password validation
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasLength = password.length >= 6;

    if (!hasUpper || !hasLower || !hasLength) {
      setError(
        "Password must be at least 6 characters with uppercase and lowercase letters."
      );
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, {
        displayName: name,
        photoURL: photo,
      });
      toast.success("Registration successful!");
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Google login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      toast.error("Google login failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="input input-bordered w-full"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="photo"
            placeholder="Photo URL"
            className="input input-bordered w-full"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full"
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>
        </form>

        <div className="divider">OR</div>

        <button onClick={handleGoogle} className="btn btn-outline w-full">
          Continue with Google
        </button>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
