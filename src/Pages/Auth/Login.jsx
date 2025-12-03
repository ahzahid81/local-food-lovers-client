import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";

const Login = () => {
  const { signIn, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      await signIn(email, password);
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Login failed. Please check your details.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Google login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="bg-base-100 shadow-xl rounded-3xl p-8 border border-orange-200">
          {/* Title */}
          <div className="mb-4">
            <h2 className="relative text-3xl font-bold tracking-tight pl-10">
              <span className="absolute left-0 top-2 w-4 h-4 rounded-full bg-primary"></span>
              <span className="absolute left-0 top-2 w-4 h-4 rounded-full bg-primary/60 animate-ping"></span>
              Login
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Welcome back to{" "}
              <span className="font-semibold text-primary">FoodieCircle</span>.
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block relative w-full">
                <input
                  type="email"
                  placeholder=" "
                  {...register("email", { required: "Email is required" })}
                  className="
                    peer w-full border border-gray-300 rounded-xl
                    px-3 pt-5 pb-2 text-sm bg-base-100 outline-none
                    focus:border-primary transition
                  "
                />
                <span
                  className="
                    absolute left-3 
                    top-1/2 -translate-y-1/2
                    text-gray-400 text-sm pointer-events-none
                    transition-all

                    peer-placeholder-shown:top-1/2
                    peer-placeholder-shown:text-sm

                    peer-focus:top-1.5
                    peer-focus:text-xs
                    peer-focus:text-primary

                    peer-[&:not(:placeholder-shown)]:top-1.5
                    peer-[&:not(:placeholder-shown)]:text-xs
                  "
                >
                  Email
                </span>
              </label>
              {errors.email && (
                <p className="text-error text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block relative w-full">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder=" "
                  {...register("password", { required: "Password is required" })}
                  className="
                    peer w-full border border-gray-300 rounded-xl
                    px-3 pt-5 pb-2 text-sm bg-base-100 outline-none
                    focus:border-primary transition pr-10
                  "
                />

                <span
                  className="
                    absolute left-3 
                    top-1/2 -translate-y-1/2
                    text-gray-400 text-sm pointer-events-none
                    transition-all

                    peer-placeholder-shown:top-1/2
                    peer-placeholder-shown:text-sm

                    peer-focus:top-1.5
                    peer-focus:text-xs
                    peer-focus:text-primary

                    peer-[&:not(:placeholder-shown)]:top-1.5
                    peer-[&:not(:placeholder-shown)]:text-xs
                  "
                >
                  Password
                </span>

                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition"
                >
                  {showPass ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </label>

              {errors.password && (
                <p className="text-error text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button className="btn btn-primary w-full rounded-xl text-base">
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="divider text-xs my-5">OR CONTINUE WITH</div>

          {/* Google login */}
          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full rounded-xl gap-2 text-sm"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          {/* Register link */}
          <p className="text-center text-sm mt-5">
            New to FoodieCircle?{" "}
            <Link to="/register" className="text-primary font-semibold">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
