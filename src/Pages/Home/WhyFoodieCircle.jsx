import React from 'react';
import { FaRegSmile, FaRegHeart, FaMapMarkedAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';


const WhyFoodieCircle = () => {
  const features = [
    {
      id: 1,
      icon: <FaMapMarkedAlt className="text-lg" />,
      title: "Local-first discovery",
      desc: "Find hidden gems, street food and small family restaurants that don’t always show up on big apps.",
    },
    {
      id: 2,
      icon: <FaRegHeart className="text-lg" />,
      title: "Honest, photo-based reviews",
      desc: "See real photos, real ratings and detailed experiences from other food lovers near you.",
    },
    {
      id: 3,
      icon: <FaRegSmile className="text-lg" />,
      title: "Built around community",
      desc: "Save favorites, share your stories and help the next foodie decide what to eat tonight.",
    },
  ];

  return (
    <section className="mt-12 md:mt-16 mb-10">
      <div className="rounded-3xl border border-base-200 bg-base-100 p-6 md:p-8 lg:p-10 flex flex-col md:flex-row gap-8 items-center">
        {/* Left text */}
        <div className="flex-1 space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-primary">
            Why FoodieCircle
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold">
            Not just ratings.{" "}
            <span className="text-primary">Real food stories.</span>
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-xl">
            FoodieCircle is made for people who care about taste, texture and the full experience – 
            not just stars. Share your favorites, warn others about disappointments and celebrate local food heroes.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            {features.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-2 bg-base-200/60 rounded-2xl p-3 md:p-4"
              >
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="text-xs text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right side CTA card */}
        <div className="w-full md:w-72 lg:w-80">
          <div className="rounded-3xl bg-gradient-to-br from-primary to-orange-500 text-white p-6 space-y-3 shadow-lg">
            <p className="text-xs uppercase tracking-[0.25em] text-white/70">
              Join the circle
            </p>
            <h3 className="text-xl font-bold">
              Start sharing your food journey today.
            </h3>
            <p className="text-xs text-white/80">
              Add your first review in less than a minute and help someone
              discover their next favorite meal.
            </p>
            <div className="flex flex-col gap-2 mt-2">
              <Link
                to="/add-review"
                className="btn btn-sm rounded-full bg-white text-primary border-0 normal-case hover:bg-base-100"
              >
                Add a review
              </Link>
              <Link
                to="/all-reviews"
                className="btn btn-sm rounded-full btn-outline border-white text-white normal-case hover:bg-white hover:text-primary"
              >
                Browse all reviews
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyFoodieCircle;