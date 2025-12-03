import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FaHeartBroken } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const fetchFavorites = async ({ queryKey }) => {
  const [_key, email] = queryKey;
  const url = `${import.meta.env.VITE_API_URL}/favorites?email=${email}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch favorites");
  return res.json();
};

const MyFavorites = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: favorites = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["favorites", user?.email],
    queryFn: fetchFavorites,
    enabled: !!user?.email,
  });

  // (Optional) Remove from favorites
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/favorites/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to remove favorite");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Removed from favorites");
      queryClient.invalidateQueries(["favorites", user?.email]);
    },
    onError: () => {
      toast.error("Failed to remove favorite");
    },
  });

  return (
    <section className="mt-4 md:mt-6 mb-10">
      {/* Header */}
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.25em] text-primary mb-1">
          Saved Items
        </p>
        <h1 className="text-2xl md:text-3xl font-extrabold">
          My <span className="text-primary">Favorites</span>
        </h1>
        <p className="text-sm text-gray-500 max-w-md mt-1">
          All your saved reviews appear here. Explore or remove them anytime.
        </p>
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
        <div className="p-6 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
          {error.message}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && favorites.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <FaHeartBroken className="text-5xl text-gray-400 mb-3" />
          <p className="text-gray-600 font-medium">
            You haven’t added any favorites yet.
          </p>
          <Link
            to="/all-reviews"
            className="btn btn-primary rounded-full mt-4 normal-case"
          >
            Explore Reviews
          </Link>
        </div>
      )}

      {/* Data Loaded */}
      {!isLoading && favorites.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {favorites.map((fav) => (
            <div
              key={fav._id}
              className="rounded-2xl border border-base-200 bg-base-100 overflow-hidden shadow-sm hover:shadow-md transition"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={fav.foodImage}
                  alt={fav.foodName}
                  className="w-full h-full object-cover hover:scale-105 duration-300"
                />

                {/* Delete Favorite */}
                <button
                  onClick={() => deleteMutation.mutate(fav._id)}
                  className="
                    absolute top-3 right-3
                    bg-white/90 hover:bg-red-500 hover:text-white
                    btn btn-xs btn-circle shadow
                    transition-all
                  "
                >
                  <MdDeleteOutline className="text-lg" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col gap-2">
                <p className="text-xs uppercase tracking-[0.2em] text-primary">
                  {fav.restaurantName}
                </p>

                <h3 className="text-lg font-semibold">{fav.foodName}</h3>

                <p className="text-xs text-gray-500">📍 {fav.location}</p>

                <div className="flex items-center gap-1 mt-2">
                  <span className="text-sm font-semibold">{fav.rating}</span>
                  <span className="text-yellow-400 text-xs">★★★★★</span>
                </div>

                <Link
                  to={`/review/${fav.reviewId}`}
                  className="
                    btn btn-sm w-full rounded-full normal-case mt-3
                    bg-base-200 hover:bg-primary hover:text-white
                    border border-base-200 hover:border-primary
                  "
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyFavorites;
