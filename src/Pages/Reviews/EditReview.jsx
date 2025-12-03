import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const fetchReviewById = async ({ queryKey }) => {
  const [_key, id] = queryKey;
  const res = await fetch(`${import.meta.env.VITE_API_URL}/reviews/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch review details");
  }
  return res.json();
};

const EditReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(0);

  const {
    data: review,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["review", id],
    queryFn: fetchReviewById,
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // যখন review data আসবে, form এ সেট করে দিবো
  useEffect(() => {
    if (review) {
      reset({
        foodName: review.foodName,
        foodImage: review.foodImage,
        restaurantName: review.restaurantName,
        location: review.location,
        rating: review.rating,
        reviewText: review.reviewText,
      });
      setRating(review.rating || 0);
    }
  }, [review, reset]);

  const updateMutation = useMutation({
    mutationFn: async (updatedData) => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/reviews/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to update review");
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success("Review updated successfully");
      queryClient.invalidateQueries(["review", id]);
      queryClient.invalidateQueries(["myReviews"]);
      queryClient.invalidateQueries(["reviews"]);
      queryClient.invalidateQueries(["topReviews"]);
      navigate("/my-reviews");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update review");
    },
  });

  const onSubmit = (data) => {
    const updatedData = {
      foodName: data.foodName,
      foodImage: data.foodImage,
      restaurantName: data.restaurantName,
      location: data.location,
      rating: Number(data.rating),
      reviewText: data.reviewText,
    };
    updateMutation.mutate(updatedData);
  };

  const handleRatingClick = (value) => {
    setRating(value);
    setValue("rating", value, { shouldValidate: true });
  };

  if (isLoading) {
    return (
      <section className="mt-4 md:mt-6 mb-10">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-3xl border border-base-200 bg-base-100 p-6 md:p-8 animate-pulse">
            <div className="h-6 bg-base-200 rounded w-1/3 mb-4" />
            <div className="h-10 bg-base-200 rounded mb-3" />
            <div className="h-10 bg-base-200 rounded mb-3" />
            <div className="h-10 bg-base-200 rounded mb-3" />
            <div className="h-24 bg-base-200 rounded mb-3" />
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="mt-4 md:mt-6 mb-10">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-3xl border border-red-200 bg-red-50 p-6 md:p-8 text-sm text-red-700">
            {error.message}
          </div>
        </div>
      </section>
    );
  }

  if (!review) {
    return null;
  }

  return (
    <section className="mt-4 md:mt-6 mb-10">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-1">
            Edit Review
          </p>
          <h1 className="text-2xl md:text-3xl font-extrabold">
            Update your{" "}
            <span className="text-primary">food experience</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1 max-w-xl">
            Adjust your rating, photo or text if something has changed.
          </p>
        </div>

        {/* Card */}
        <div className="bg-base-100 rounded-3xl shadow-xl border border-base-200 p-6 md:p-8">
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
                  Current: <span className="font-semibold">{rating}</span> / 5
                </p>
              </div>

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
                  Update your review
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
              disabled={updateMutation.isLoading}
              className="
                btn w-full rounded-full normal-case mt-2
                bg-gradient-to-r from-primary to-orange-500
                text-white border-0 shadow-md hover:shadow-lg
                hover:scale-[1.02] active:scale-95
                transition-transform duration-150
              "
            >
              {updateMutation.isLoading ? "Updating..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditReview;
