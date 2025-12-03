import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";

const AddReview = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      foodName: "",
      foodImage: "",
      restaurantName: "",
      location: "",
      rating: 4,
      reviewText: "",
    },
  });

  const [rating, setRating] = useState(4);

  const addReviewMutation = useMutation({
    mutationFn: async (reviewData) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to add review");
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success("Review added successfully!");
      queryClient.invalidateQueries(["reviews"]);
      queryClient.invalidateQueries(["topReviews"]);
      reset();
      navigate("/all-reviews", { replace: true });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add review.");
    },
  });

  const onSubmit = (data) => {
    if (!user?.email) {
      toast.error("You must be logged in to add a review.");
      navigate("/login", { state: { from: location } });
      return;
    }

    const reviewData = {
      foodName: data.foodName,
      foodImage: data.foodImage,
      restaurantName: data.restaurantName,
      location: data.location,
      rating: Number(data.rating),
      reviewText: data.reviewText,
      reviewerName: user.displayName || "Anonymous",
      userEmail: user.email,
      createdAt: new Date().toISOString(),
    };

    addReviewMutation.mutate(reviewData);
  };

  const handleRatingClick = (value) => {
    setRating(value);
    setValue("rating", value, { shouldValidate: true });
  };

  return (
    <section className="mt-4 md:mt-6 mb-10">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-1">
            Share a Review
          </p>
          <h1 className="text-2xl md:text-3xl font-extrabold">
            Add your <span className="text-primary">local food experience</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1 max-w-xl">
            Help others discover great spots by sharing honest reviews with photos and ratings.
          </p>
        </div>

        {/* Card */}
        <div className="bg-base-100 rounded-3xl shadow-xl border border-base-200 p-6 md:p-8">
          {/* Reviewer info (read-only display) */}
          <div className="mb-5 flex flex-wrap items-center gap-3 text-sm bg-base-200/60 rounded-2xl px-4 py-3">
            <div className="avatar placeholder">
              <div className="w-9 rounded-full bg-primary/10 text-primary font-bold">
                <span>
                  {(user?.displayName?.[0] || user?.email?.[0] || "U").toUpperCase()}
                </span>
              </div>
            </div>
            <div>
              <p className="font-semibold">{user?.displayName || "Foodie User"}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <span className="ml-auto text-xs text-gray-400">
              {new Date().toLocaleDateString()}
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Food Name */}
            <div>
              <label className="block relative w-full">
                <input
                  type="text"
                  placeholder=" "
                  {...register("foodName", {
                    required: "Food name is required",
                  })}
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
                  Food Name
                </span>
              </label>
              {errors.foodName && (
                <p className="text-error text-xs mt-1">
                  {errors.foodName.message}
                </p>
              )}
            </div>

            {/* Food Image URL */}
            <div>
              <label className="block relative w-full">
                <input
                  type="text"
                  placeholder=" "
                  {...register("foodImage", {
                    required: "Food image URL is required",
                  })}
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
                  Food Image URL
                </span>
              </label>
              {errors.foodImage && (
                <p className="text-error text-xs mt-1">
                  {errors.foodImage.message}
                </p>
              )}
            </div>

            {/* Restaurant Name & Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Restaurant Name */}
              <div>
                <label className="block relative w-full">
                  <input
                    type="text"
                    placeholder=" "
                    {...register("restaurantName", {
                      required: "Restaurant name is required",
                    })}
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
                    Restaurant Name
                  </span>
                </label>
                {errors.restaurantName && (
                  <p className="text-error text-xs mt-1">
                    {errors.restaurantName.message}
                  </p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="block relative w-full">
                  <input
                    type="text"
                    placeholder=" "
                    {...register("location", {
                      required: "Location is required",
                    })}
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
                    Location (Area / City)
                  </span>
                </label>
                {errors.location && (
                  <p className="text-error text-xs mt-1">
                    {errors.location.message}
                  </p>
                )}
              </div>
            </div>

            {/* Rating */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium">Star Rating</p>
                <p className="text-xs text-gray-500">
                  You selected: <span className="font-semibold">{rating}</span> / 5
                </p>
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, idx) => {
                  const value = idx + 1;
                  return (
                    <button
                      type="button"
                      key={value}
                      onClick={() => handleRatingClick(value)}
                      className={`
                        text-2xl md:text-3xl
                        ${value <= rating ? "text-yellow-400" : "text-base-300"}
                        hover:scale-110 transition-transform
                      `}
                    >
                      ★
                    </button>
                  );
                })}
              </div>

              {/* Hidden Rating input for react-hook-form */}
              <input
                type="number"
                hidden
                {...register("rating", {
                  required: "Rating is required",
                  min: 1,
                  max: 5,
                })}
              />
              {errors.rating && (
                <p className="text-error text-xs mt-1">
                  {errors.rating.message}
                </p>
              )}
            </div>

            {/* Review Text */}
            <div>
              <label className="block relative w-full">
                <textarea
                  rows={4}
                  placeholder=" "
                  {...register("reviewText", {
                    required: "Review text is required",
                    minLength: {
                      value: 10,
                      message: "Review should be at least 10 characters long",
                    },
                  })}
                  className="
                    peer w-full border border-gray-300 rounded-xl
                    px-3 pt-5 pb-2 text-sm bg-base-100 outline-none
                    focus:border-primary transition resize-none
                  "
                />
                <span
                  className="
                    absolute left-3 
                    top-3
                    text-gray-400 text-sm pointer-events-none
                    transition-all
                    peer-placeholder-shown:top-3
                    peer-placeholder-shown:text-sm
                    peer-focus:top-1.5
                    peer-focus:text-xs
                    peer-focus:text-primary
                    peer-[&:not(:placeholder-shown)]:top-1.5
                    peer-[&:not(:placeholder-shown)]:text-xs
                  "
                >
                  Write your review
                </span>
              </label>
              {errors.reviewText && (
                <p className="text-error text-xs mt-1">
                  {errors.reviewText.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={addReviewMutation.isLoading}
              className="
                btn w-full rounded-full normal-case mt-2
                bg-gradient-to-r from-primary to-orange-500
                text-white border-0 shadow-md hover:shadow-lg
                hover:scale-[1.02] active:scale-95
                transition-transform duration-150
              "
            >
              {addReviewMutation.isLoading ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddReview;
