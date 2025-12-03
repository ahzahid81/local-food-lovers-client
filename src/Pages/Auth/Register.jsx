import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const { createUser, updateUserProfile, googleLogin } = useAuth();
  const navigate = useNavigate();

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, photoURL, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      toast.error("Password & Confirm Password do not match");
      return;
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);

    if (password.length < 6 || !hasUpperCase || !hasLowerCase) {
      toast.error(
        "Password must be at least 6 characters and include uppercase & lowercase letters"
      );
      return;
    }

    try {
      await createUser(email, password);
      await updateUserProfile(name, photoURL);
      reset();
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Registration failed.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Google login failed.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-10 ">
      <div className="w-full max-w-md">
        <div className="bg-base-100 shadow-xl rounded-3xl p-8 border border-orange-200">

          {/* Title */}
          <div className="mb-4">
            <h2 className="relative text-3xl font-bold tracking-tight pl-10">
              <span className="absolute left-0 top-2 w-4 h-4 rounded-full bg-primary"></span>
              <span className="absolute left-0 top-2 w-4 h-4 rounded-full bg-primary/60 animate-ping"></span>
              Register
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Create an account to join{" "}
              <span className="font-semibold text-primary">FoodieCircle</span>.
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* Full Name */}
            <div>
              <label className="block relative w-full">
                <input
                  type="text"
                  placeholder=" "
                  {...register("name", { required: "Name is required" })}
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
                  Full Name
                </span>
              </label>
              {errors.name && (
                <p className="text-error text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Photo URL */}
            <div>
              <label className="block relative w-full">
                <input
                  type="text"
                  placeholder=" "
                  {...register("photoURL", { required: "Photo URL is required" })}
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
                  Photo URL
                </span>
              </label>
              {errors.photoURL && (
                <p className="text-error text-xs mt-1">
                  {errors.photoURL.message}
                </p>
              )}
            </div>

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

                {/* LABEL */}
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

                {/* SHOW/HIDE ICON */}
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

              <p className="text-xs text-gray-500 mt-1">
                Must include uppercase, lowercase & be at least 6 characters.
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block relative w-full">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder=" "
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                  })}
                  className="
                    peer w-full border border-gray-300 rounded-xl
                    px-3 pt-5 pb-2 text-sm bg-base-100 outline-none
                    focus:border-primary transition pr-10
                  "
                />

                {/* LABEL */}
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
                  Confirm Password
                </span>

                {/* ICON */}
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition"
                >
                  {showConfirm ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </label>

              {errors.confirmPassword && (
                <p className="text-error text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button className="btn btn-primary w-full rounded-xl text-base">
              Register
            </button>
          </form>

          {/* Divider */}
          <div className="divider text-xs">OR</div>

          {/* Google Login */}
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

          {/* Already have account */}
          <p className="text-center text-sm mt-5">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
