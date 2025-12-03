const FeaturedReviews = () => {
  return (
    <section className="mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl md:text-3xl font-bold">
          Top Rated This Week
        </h2>
        <a href="/all-reviews" className="btn btn-sm btn-outline rounded-full">
          Show All
        </a>
      </div>
      {/* পরে এখানে আসল ডাটা ফেচ করে ম্যাপ করবে */}
      <p className="text-gray-500 text-sm">
        Coming soon: dynamic featured reviews from database.
      </p>
    </section>
  );
};

export default FeaturedReviews;
