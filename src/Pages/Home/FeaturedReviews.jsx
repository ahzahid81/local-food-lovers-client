import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const fetchTopReviews = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/reviews/top`);
  if (!res.ok) {
    throw new Error("Failed to fetch top reviews");
  }
  return res.json();
};

const FeaturedReviews = () => {
  const {
    data: reviews = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["topReviews"],
    queryFn: fetchTopReviews,
  });

  return (
    <section className="mt-10 md:mt-14">
      {/* Section heading */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-1">
            Top Picks
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold">
            Featured <span className="text-primary">Reviews</span>
          </h2>
          <p className="text-sm text-gray-500 mt-1 max-w-md">
            Handpicked local favorites, rated by the FoodieCircle community.
          </p>
        </div>

        <Link
          to="/all-reviews"
          className="
            btn btn-sm md:btn-md rounded-full normal-case
            border border-primary/30 text-primary
            hover:bg-primary hover:text-white hover:border-primary
          "
        >
          Show All Reviews
        </Link>
      </div>

      {/* Loading state */}
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

      {/* Error state */}
      {isError && (
        <div className="p-6 rounded-2xl bg-red-50 border border-red-200 text-sm text-red-600">
          Failed to load featured reviews. Please try again later.
          <div className="mt-1 text-xs text-red-400">
            {error?.message}
          </div>
        </div>
      )}

      {/* Data loaded */}
      {!isLoading && !isError && (
        <>
          {reviews.length === 0 ? (
            <p className="text-sm text-gray-500">
              No reviews found yet. Be the first to{" "}
              <Link to="/add-review" className="text-primary font-semibold">
                add a review
              </Link>
              .
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {reviews.slice(0, 6).map((review) => (
                <div
                  key={review._id}
                  className="rounded-2xl border border-base-200 bg-base-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Image */}
                  <figure className="h-44 w-full overflow-hidden">
                    <img
                      src={review.foodImage}
                      alt={review.foodName}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </figure>

                  {/* Content */}
                  <div className="p-4 flex flex-col gap-2">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-primary mb-1">
                        {review.restaurantName}
                      </p>
                      <h3 className="text-lg font-semibold">
                        {review.foodName}
                      </h3>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        📍 {review.location}
                      </p>
                    </div>

                    {/* Rating + Reviewer */}
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-semibold">
                          {review.rating?.toFixed ? review.rating.toFixed(1) : review.rating}
                        </span>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <span
                              key={idx}
                              className={idx < Math.round(review.rating || 0)
                                ? "text-yellow-400 text-xs"
                                : "text-base-300 text-xs"}
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

                    {/* View Details */}
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
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default FeaturedReviews;
