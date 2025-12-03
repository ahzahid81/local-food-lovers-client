import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-base-200 border-t border-base-300 mt-10">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-10 space-y-6">
        {/* Top */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 justify-between">
          {/* Brand */}
          <div className="space-y-3 max-w-sm">
            <Link to="/" className="inline-flex items-center gap-2">
              <span className="text-2xl font-extrabold tracking-tight">
                <span className="text-primary">Foodie</span>
                <span className="text-neutral">Circle</span>
              </span>
            </Link>
            <p className="text-sm text-gray-600">
              A community of local food lovers sharing honest reviews, hidden gems
              and favorite dishes from around the city.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-1 flex-wrap gap-8 md:gap-12 justify-between">
            {/* Navigation Links */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-gray-700">
                Pages
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/"
                    className="hover:text-primary transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/all-reviews"
                    className="hover:text-primary transition-colors"
                  >
                    All Reviews
                  </Link>
                </li>
                <li>
                  <Link
                    to="/add-review"
                    className="hover:text-primary transition-colors"
                  >
                    Add Review
                  </Link>
                </li>
                <li>
                  <Link
                    to="/my-reviews"
                    className="hover:text-primary transition-colors"
                  >
                    My Reviews
                  </Link>
                </li>
                <li>
                  <Link
                    to="/my-favorites"
                    className="hover:text-primary transition-colors"
                  >
                    My Favorites
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-gray-700">
                Connect
              </h3>
              <p className="text-xs text-gray-500 mb-3 max-w-xs">
                Follow FoodieCircle on social media and stay updated with
                trending local dishes.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full bg-base-100 border border-base-300 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition"
                >
                  <FaFacebookF className="text-sm" />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-base-100 border border-base-300 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition"
                >
                  <FaInstagram className="text-sm" />
                </a>
                {/* X (new Twitter logo) */}
                <a
                  href="#"
                  aria-label="X"
                  className="w-9 h-9 rounded-full bg-base-100 border border-base-300 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition"
                >
                  <FaXTwitter className="text-sm" />
                </a>
                <a
                  href="#"
                  aria-label="YouTube"
                  className="w-9 h-9 rounded-full bg-base-100 border border-base-300 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition"
                >
                  <FaYoutube className="text-sm" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-base-300 pt-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">
            © {year} FoodieCircle. All rights reserved.
          </p>
          <p className="text-xs text-gray-400">
            Built with <span className="text-primary font-semibold">React</span>,{" "}
            <span className="font-semibold">Tailwind</span> &{" "}
            <span className="font-semibold">daisyUI</span>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
