import { Link, useRouteError } from "react-router-dom";

const NotFound = () => {
  const error = useRouteError();

  return (
    <section className="min-h-[calc(100vh-160px)] flex items-center justify-center px-4 py-10">
      <div className="max-w-md mx-auto text-center space-y-6">
        {/* Fun image */}
        <div className="relative w-full flex justify-center">
          <div className="w-52 h-52 rounded-full bg-orange-100 flex items-center justify-center overflow-hidden shadow-inner">
            <img
              src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=80"
              alt="Lost burger"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-2 right-10 bg-primary text-white text-xs px-3 py-1 rounded-full shadow">
            404 – Page not found
          </div>
        </div>

        {/* Heading */}
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
            Oops! This plate is empty 🍽️
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Looks like the page you’re looking for isn’t on the menu.
            Maybe it was removed or the URL is a bit overcooked.
          </p>
        </div>

        {/* Optional error code */}
        {error && (
          <p className="text-xs text-gray-400">
            {error.status} {error.statusText || ""}
          </p>
        )}

        {/* Back to home button */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
          <Link
            to="/"
            className="
              btn rounded-full normal-case
              bg-gradient-to-r from-primary to-orange-500
              text-white border-0 shadow-md hover:shadow-lg
              hover:scale-[1.03] active:scale-95
              transition-transform duration-150
            "
          >
            Back to Home
          </Link>

          <Link
            to="/all-reviews"
            className="
              btn btn-outline rounded-full normal-case
              border-base-300 text-gray-700
              hover:border-primary hover:text-primary
            "
          >
            Browse Reviews
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
