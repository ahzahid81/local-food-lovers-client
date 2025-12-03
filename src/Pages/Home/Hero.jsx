import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="w-full rounded-3xl overflow-hidden shadow-xl mt-4 md:mt-6">
      <div className="carousel w-full">

        {/* ------------------ Slide 1 ------------------ */}
        <div id="slide1" className="carousel-item relative w-full h-[360px] md:h-[480px]">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20">
            <div className="max-w-6xl mx-auto h-full flex items-center pl-6 md:pl-20 lg:pl-28 pr-6">

              <div className="max-w-lg bg-black/40 backdrop-blur-md border border-white/15 rounded-2xl p-5 md:p-7 text-left text-white z-10">
                
                <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-orange-200 mb-2">
                  Local Food Lovers Network
                </p>

                <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold leading-snug">
                  Discover hidden <span className="text-primary">local flavors</span> near you.
                </h2>

                <p className="text-sm md:text-base text-gray-200 mt-3">
                  See what locals are eating — from street food to cozy restaurants.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    to="/all-reviews"
                    className="
                      btn rounded-full border-0
                      bg-gradient-to-r from-primary to-orange-400
                      text-white shadow-lg hover:shadow-xl
                      hover:scale-105 active:scale-95
                      transition-transform duration-150
                      px-6
                    "
                  >
                    Explore Reviews
                  </Link>

                  <Link
                    to="/add-review"
                    className="
                      btn btn-outline rounded-full
                      border-white/60 text-white
                      hover:border-primary hover:text-primary hover:bg-white
                      px-6
                    "
                  >
                    Share Your Review
                  </Link>
                </div>

              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="absolute flex justify-between transform -translate-y-1/2 left-2 right-2 top-1/2">
            <a href="#slide3" className="btn btn-circle btn-sm">❮</a>
            <a href="#slide2" className="btn btn-circle btn-sm">❯</a>
          </div>
        </div>

        {/* ------------------ Slide 2 ------------------ */}
        <div id="slide2" className="carousel-item relative w-full h-[360px] md:h-[480px]">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80"
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20">
            <div className="max-w-6xl mx-auto h-full flex items-center pl-6 md:pl-20 lg:pl-28 pr-6">

              <div className="max-w-lg bg-black/40 backdrop-blur-md border border-white/15 rounded-2xl p-5 md:p-7 text-white">

                <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-orange-200 mb-2">
                  Share Your Story
                </p>

                <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold leading-snug">
                  Turn every meal into a <span className="text-primary">story.</span>
                </h2>

                <p className="text-sm md:text-base text-gray-200 mt-3">
                  Add photos, ratings & honest reviews of the places you visit.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    to="/add-review"
                    className="
                      btn rounded-full border-0
                      bg-gradient-to-r from-primary to-orange-400
                      text-white shadow-lg hover:shadow-xl
                      hover:scale-105 active:scale-95
                      transition-transform duration-150
                      px-6
                    "
                  >
                    Add Review
                  </Link>

                  <Link
                    to="/my-reviews"
                    className="
                      btn btn-outline rounded-full
                      border-white/60 text-white
                      hover:border-primary hover:text-primary hover:bg-white
                      px-6
                    "
                  >
                    My Reviews
                  </Link>
                </div>

              </div>
            </div>
          </div>

          <div className="absolute flex justify-between transform -translate-y-1/2 left-2 right-2 top-1/2">
            <a href="#slide1" className="btn btn-circle btn-sm">❮</a>
            <a href="#slide3" className="btn btn-circle btn-sm">❯</a>
          </div>
        </div>

        {/* ------------------ Slide 3 ------------------ */}
        <div id="slide3" className="carousel-item relative w-full h-[360px] md:h-[480px]">
          <img
            src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1400&q=80"
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20">
            <div className="max-w-6xl mx-auto h-full flex items-center pl-6 md:pl-20 lg:pl-28 pr-6">

              <div className="max-w-lg bg-black/40 backdrop-blur-md border border-white/15 rounded-2xl p-5 md:p-7 text-white">

                <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-orange-200 mb-2">
                  Community Favorites
                </p>

                <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold leading-snug">
                  Explore the most <span className="text-primary">loved dishes</span>.
                </h2>

                <p className="text-sm md:text-base text-gray-200 mt-3">
                  See trending foods based on top favorites & public reviews.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    to="/all-reviews"
                    className="
                      btn rounded-full border-0
                      bg-gradient-to-r from-primary to-orange-400
                      text-white shadow-lg hover:shadow-xl
                      hover:scale-105 active:scale-95
                      transition-transform duration-150
                      px-6
                    "
                  >
                    Top Rated
                  </Link>

                  <Link
                    to="/my-favorites"
                    className="
                      btn btn-outline rounded-full
                      border-white/60 text-white
                      hover:border-primary hover:text-primary hover:bg-white
                      px-6
                    "
                  >
                    My Favorites
                  </Link>
                </div>

              </div>
            </div>
          </div>

          <div className="absolute flex justify-between transform -translate-y-1/2 left-2 right-2 top-1/2">
            <a href="#slide2" className="btn btn-circle btn-sm">❮</a>
            <a href="#slide1" className="btn btn-circle btn-sm">❯</a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;
