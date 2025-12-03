import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";

const fetchReviews = async ({ queryKey }) => {
  const [_key, search] = queryKey;
  const url = new URL(`${import.meta.env.VITE_API_URL}/reviews`);
  if (search) {
    url.searchParams.append("search", search);
  }
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch reviews");
  }
  return res.json();
};

const fetchFavorites = async ({ queryKey }) => {
  const [_key, email] = queryKey;
  const url = new URL(`${import.meta.env.VITE_API_URL}/favorites`);
  url.searchParams.append("email", email);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch favorites");
  }
  return res.json();
};

const AllReviews = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const [searchInput, setSearchInput] = useState("");
  const [searchText, setSearchText] = useState("");

  // All reviews (sorted by date from server)
  const {
    data: reviews = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["reviews", searchText],
    queryFn: fetchReviews,
  });

  // User favorites (for heart filled state)
  const {
    data: favorites = [],
    isLoading: favLoading,
  } = useQuery({
    queryKey: ["favorites", user?.email],
    queryFn: fetchFavorites,
    enabled: !!user?.email, // শুধুমাত্র লগইন থাকলে কল হবে
  });

  const addFavoriteMutation = useMutation({
    mutationFn: async (review) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reviewId: review._id,
          foodName: review.foodName,
          foodImage: review.foodImage,
          restaurantName: review.restaurantName,
          location: review.location,
          rating: review.rating,
          userEmail: user.email,
          createdAt: new Date(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to add favorite");
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success("Added to favorites");
      queryClient.invalidateQueries(["favorites", user?.email]);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to add favorite");
    },
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchText(searchInput.trim());
  };

  const handleFavoriteClick = (review) => {
    if (!user) {
      toast.error("You need to login to add favorites");
      navigate("/login", { state: { from: location } });
      return;
    }

    const alreadyFav = favorites?.some(
      (fav) => fav.reviewId === review._id
    );

    if (alreadyFav) {
      toast("Already in your favorites", { icon: "❤️" });
      return;
    }

    addFavoriteMutation.mutate(review);
  };

  const isReviewFavorite = (reviewId) => {
    return favorites?.some((fav) => fav.reviewId === reviewId);
  };

  return (
    <section className="mt-2 md:mt-4 mb-10">
      {/* Header + Search */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-1">
            All Reviews
          </p>
          <h1 className="text-2xl md:text-3xl font-extrabold">
            Discover <span className="text-primary">local food stories</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1 max-w-md">
            Browse what people are eating nearby. Use search to find your next favorite dish.
          </p>
        </div>

        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center gap-2 w-full md:w-auto"
        >
          <div className="relative w-full md:w-64">
            <input
              type="text"
              className="input input-bordered w-full pr-9 rounded-full"
              placeholder="Search by food name"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-primary"
            >
              🔍
            </button>
          </div>
        </form>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-base-200 bg-base-100 p-4 animate-pulse"
            >
              <div className="h-40 rounded-xl bg-base-200 mb-3" />
              <div className="h-4 bg-base-200 rounded w-3/4 mb-2" />
              <div className="h-3 bg-base-200 rounded w-1/2 mb-2" />
              <div className="h-3 bg-base-200 rounded w-2/3 mb-4" />
              <div className="h-9 bg-base-200 rounded w-full" />
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="p-6 rounded-2xl bg-red-50 border border-red-200 text-sm text-red-600">
          Failed to load reviews. Please try again later.
          <div className="mt-1 text-xs text-red-400">
            {error?.message}
          </div>
        </div>
      )}

      {/* Data Loaded */}
      {!isLoading && !isError && (
        <>
          {reviews.length === 0 ? (
            <p className="text-sm text-gray-500">
              No reviews found matching your search.
            </p>
          ) : (
            <>
              <p className="text-xs text-gray-500 mb-3">
                Showing {reviews.length} review{reviews.length > 1 ? "s" : ""}{" "}
                {searchText && (
                  <>
                    for <span className="font-semibold">"{searchText}"</span>
                  </>
                )}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {reviews.map((review) => {
                  const favorite = isReviewFavorite(review._id);

                  return (
                    <div
                      key={review._id}
                      className="rounded-2xl border border-base-200 bg-base-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
                    >
                      {/* Image + favorite */}
                      <div className="relative h-44 w-full overflow-hidden">
                        <img
                          src={review.foodImage}
                          alt={review.foodName}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />

                        <button
                          onClick={() => handleFavoriteClick(review)}
                          disabled={addFavoriteMutation.isLoading}
                          className="
                            absolute right-3 top-3
                            btn btn-xs btn-circle border-0
                            bg-base-100/90 hover:bg-white shadow
                          "
                        >
                          {favorite ? (
                            <FaHeart className="text-red-500" />
                          ) : (
                            <FaRegHeart className="text-gray-500" />
                          )}
                        </button>
                      </div>

                      {/* Content */}
                      <div className="p-4 flex flex-col flex-1 gap-2">
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-primary mb-1">
                            {review.restaurantName}
                          </p>
                          <h3 className="text-lg font-semibold line-clamp-1">
                            {review.foodName}
                          </h3>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            📍 {review.location}
                          </p>
                        </div>

                        {/* Review text snippet */}
                        <p className="text-xs text-gray-600 mt-1 line-clamp-3">
                          {review.reviewText}
                        </p>

                        {/* Rating + reviewer */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-semibold">
                              {review.rating?.toFixed
                                ? review.rating.toFixed(1)
                                : review.rating}
                            </span>
                            <div className="flex items-center">
                              {Array.from({ length: 5 }).map((_, idx) => (
                                <span
                                  key={idx}
                                  className={
                                    idx < Math.round(review.rating || 0)
                                      ? "text-yellow-400 text-xs"
                                      : "text-base-300 text-xs"
                                  }
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-gray-500">
                            by{" "}
                            <span className="font-medium">
                              {review.reviewerName || "Anonymous"}
                            </span>
                          </p>
                        </div>

                        {/* View details button */}
                        <div className="mt-3">
                          <Link
                            to={`/review/${review._id}`}
                            className="
                              btn btn-sm w-full rounded-full normal-case
                              bg-base-200 hover:bg-primary hover:text-white
                              border border-base-200 hover:border-primary
                            "
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
};

export default AllReviews;