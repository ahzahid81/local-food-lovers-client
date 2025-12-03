import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import { MdDeleteOutline, MdEdit } from "react-icons/md";

const fetchMyReviews = async ({ queryKey }) => {
  const [_key, email] = queryKey;

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/my-reviews?email=${email}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch your reviews");
  }
  return res.json();
};

const MyReviews = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [selectedReview, setSelectedReview] = useState(null);

  const {
    data: reviews = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["myReviews", user?.email],
    queryFn: fetchMyReviews,
    enabled: !!user?.email,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/reviews/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to delete review");
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success("Review deleted successfully");
      queryClient.invalidateQueries(["myReviews", user?.email]);
      queryClient.invalidateQueries(["reviews"]);
      queryClient.invalidateQueries(["topReviews"]);
      setSelectedReview(null);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete review");
    },
  });

  const handleDeleteClick = (review) => {
    setSelectedReview(review);
    const modal = document.getElementById("delete_review_modal");
    if (modal && typeof modal.showModal === "function") {
      modal.showModal();
    }
  };

  const confirmDelete = () => {
    if (selectedReview && selectedReview._id) {
      deleteMutation.mutate(selectedReview._id);
    }
  };

  const formatDate = (iso) => {
    if (!iso) return "N/A";
    const d = new Date(iso);
    return d.toLocaleDateString();
  };

  return (
    <section className="mt-4 md:mt-6 mb-10">
      {/* Header */}
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.25em] text-primary mb-1">
          Manage
        </p>
        <h1 className="text-2xl md:text-3xl font-extrabold">
          My <span className="text-primary">Reviews</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1 max-w-md">
          Edit or delete your submitted reviews from here. Keep your food diary up to date.
        </p>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="overflow-x-auto">
          <div className="rounded-2xl border border-base-200 bg-base-100 p-4 animate-pulse">
            <div className="h-5 bg-base-200 rounded w-1/2 mb-4" />
            <div className="h-10 bg-base-200 rounded mb-2" />
            <div className="h-10 bg-base-200 rounded mb-2" />
            <div className="h-10 bg-base-200 rounded mb-2" />
          </div>
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-sm text-red-600">
          {error.message}
        </div>
      )}

      {/* Empty */}
      {!isLoading && !isError && reviews.length === 0 && (
        <div className="rounded-2xl border border-base-200 bg-base-100 p-8 text-center">
          <p className="text-gray-600 font-medium">
            You haven't added any reviews yet.
          </p>
          <Link
            to="/add-review"
            className="btn btn-primary rounded-full mt-4 normal-case"
          >
            Add Your First Review
          </Link>
        </div>
      )}

      {/* Table */}
      {!isLoading && !isError && reviews.length > 0 && (
        <div className="rounded-2xl border border-base-200 bg-base-100 p-4 md:p-6">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr className="text-xs md:text-sm text-gray-500">
                  <th>#</th>
                  <th>Food</th>
                  <th>Restaurant</th>
                  <th>Location</th>
                  <th>Posted</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review, index) => (
                  <tr key={review._id} className="hover">
                    <td className="text-xs md:text-sm">{index + 1}</td>

                    {/* Food Image + Name */}
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={review.foodImage}
                              alt={review.foodName}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold text-sm md:text-base">
                            {review.foodName}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            ⭐ {review.rating}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Restaurant */}
                    <td className="text-xs md:text-sm">
                      <div className="font-medium">
                        {review.restaurantName}
                      </div>
                    </td>

                    {/* Location */}
                    <td className="text-xs md:text-sm">
                      {review.location}
                    </td>

                    {/* Posted date */}
                    <td className="text-xs md:text-sm">
                      {formatDate(review.createdAt)}
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="flex items-center justify-center gap-2">
                        {/* Edit */}
                        <Link
                          to={`/edit-review/${review._id}`}
                          className="
                            btn btn-xs md:btn-sm rounded-full
                            bg-base-200 hover:bg-primary hover:text-white
                            border-none
                            flex items-center gap-1
                          "
                        >
                          <MdEdit />
                          <span className="hidden md:inline">Edit</span>
                        </Link>

                        {/* Delete */}
                        <button
                          onClick={() => handleDeleteClick(review)}
                          className="
                            btn btn-xs md:btn-sm rounded-full
                            bg-red-50 text-red-500 hover:bg-red-500 hover:text-white
                            border-none flex items-center gap-1
                          "
                        >
                          <MdDeleteOutline />
                          <span className="hidden md:inline">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      <dialog id="delete_review_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-2">Delete Review?</h3>
          <p className="text-sm text-gray-600">
            Are you sure you want to delete{" "}
            <span className="font-semibold">
              {selectedReview?.foodName}
            </span>{" "}
            from your reviews? This action cannot be undone.
          </p>
          <div className="modal-action">
            <form method="dialog" className="flex gap-2">
              <button className="btn btn-sm rounded-full">Cancel</button>
              <button
                type="button"
                onClick={confirmDelete}
                className="
                  btn btn-sm rounded-full
                  bg-red-500 text-white border-none
                  hover:bg-red-600
                "
              >
                {deleteMutation.isLoading ? "Deleting..." : "Confirm"}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </section>
  );
};

export default MyReviews;
