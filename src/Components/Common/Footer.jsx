import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-base-200 mt-10">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row gap-8 justify-between">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-3">
              <span className="text-2xl font-extrabold tracking-tight">
                <span className="text-primary">Foodie</span>
                <span className="text-neutral">Circle</span>
              </span>
            </Link>
            <p className="text-sm text-gray-600 max-w-xs">
              A local food lovers community where you can discover hidden gems,
              share honest reviews, and favorite your best bites.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <NavLink to="/" className="hover:text-primary">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/all-reviews" className="hover:text-primary">
                  All Reviews
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" className="hover:text-primary">
                  Login
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-2">Follow Us</h3>
            <div className="flex gap-3">
              <a href="#" className="btn btn-ghost btn-circle btn-sm">
                {/* X logo */}
                <span className="text-lg font-bold">𝕏</span>
              </a>
              <a href="#" className="btn btn-ghost btn-circle btn-sm">
                F
              </a>
              <a href="#" className="btn btn-ghost btn-circle btn-sm">
                IG
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-base-300 mt-6 pt-4 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} FoodieCircle. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
