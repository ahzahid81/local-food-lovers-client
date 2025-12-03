import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";

const fetchReviewById = async ({ queryKey }) => {
  const [_key, id] = queryKey;
  const res = await fetch(`${import.meta.env.VITE_API_URL}/reviews/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch review details");
  }
  return res.json();
};

const ReviewDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: review,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["reviewDetails", id],
    queryFn: fetchReviewById,
  });

  const formatDate = (iso) => {
    if (!iso) return "N/A";
    const d = new Date(iso);
    return d.toLocaleDateString();
  };

  if (isLoading) {
    return (
      <section className="mt-4 md:mt-6 mb-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4">
            <div className="h-8 w-32 bg-base-200 rounded-full animate-pulse" />
          </div>
          <div className="bg-base-100 rounded-3xl border border-base-200 shadow-xl overflow-hidden animate-pulse">
            <div className="h-56 md:h-72 bg-base-200" />
            <div className="p-6 md:p-8 space-y-3">
              <div className="h-6 bg-base-200 w-1/2 rounded" />
              <div className="h-4 bg-base-200 w-1/3 rounded" />
              <div className="h-4 bg-base-200 w-full rounded" />
              <div className="h-4 bg-base-200 w-5/6 rounded" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="mt-4 md:mt-6 mb-10">
        <div className="max-w-3xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-sm text-red-600">
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
    <section className="mt-4 md:mt-6 mb-12">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border border-base-300 hover:border-primary hover:bg-primary/5 transition"
        >
          <FaArrowLeftLong />
          Back
        </button>

        {/* Card */}
        <div className="bg-base-100 rounded-3xl border border-base-200 shadow-xl overflow-hidden">
          {/* Image */}
          <div className="relative h-56 md:h-72">
            <img
              src={review.foodImage}
              alt={review.foodName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

            {/* Top Title overlay */}
            <div className="absolute bottom-4 left-4 right-4 md:left-8 md:right-8 text-white">
              <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-orange-200 mb-1">
                {review.restaurantName}
              </p>
              <h1 className="text-2xl md:text-3xl font-extrabold drop-shadow-sm">
                {review.foodName}
              </h1>
              <p className="text-xs md:text-sm text-gray-100 mt-1">
                📍 {review.location}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 space-y-5">
            {/* Rating + Meta */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-400 text-xl" />
                  <span className="text-lg font-semibold">
                    {review.rating?.toFixed ? review.rating.toFixed(1) : review.rating}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <span
                      key={idx}
                      className={
                        idx < Math.round(review.rating || 0)
                          ? "text-yellow-400 text-sm"
                          : "text-base-300 text-sm"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              {/* Reviewer */}
              <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="avatar placeholder">
                    <div className="w-8 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                      {(review.reviewerName?.[0] || "F").toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">
                      {review.reviewerName || "Foodie User"}
                    </p>
                    <p className="text-[0.7rem] md:text-xs">
                      Posted on {formatDate(review.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="divider my-0"></div>

            {/* Review Text */}
            <div className="space-y-2">
              <h2 className="text-base md:text-lg font-semibold">
                Review
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-gray-700 whitespace-pre-line">
                {review.reviewText}
              </p>
            </div>

            {/* Bottom actions */}
            <div className="pt-2 flex flex-wrap justify-between items-center gap-3">
              <div className="text-xs text-gray-500">
                Category:{" "}
                <span className="font-medium">
                  {review.category || "Local Food"}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                <Link
                  to="/all-reviews"
                  className="
                    btn btn-sm rounded-full normal-case
                    bg-base-200 hover:bg-primary hover:text-white
                    border border-base-200 hover:border-primary
                  "
                >
                  Browse More Reviews
                </Link>
                <Link
                  to="/add-review"
                  className="
                    btn btn-sm rounded-full normal-case
                    bg-primary text-white border-0
                    hover:bg-primary/90
                  "
                >
                  Add Your Own Review
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewDetails;
