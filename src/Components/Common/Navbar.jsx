import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to logout. Please try again.");
    }
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold"
              : "hover:text-primary transition"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-reviews"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold"
              : "hover:text-primary transition"
          }
        >
          All Reviews
        </NavLink>
      </li>
    </>
  );

  const userInitial =
    user?.displayName?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="bg-base-100/90 border-b border-base-200 backdrop-blur">
      <div className="navbar max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Left */}
        <div className="navbar-start">
          {/* Mobile dropdown */}
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-extrabold tracking-tight">
              <span className="text-primary">Foodie</span>
              <span className="text-neutral">Circle</span>
            </span>
          </Link>
        </div>

        {/* Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">{navLinks}</ul>
        </div>

        {/* Right */}
        <div className="navbar-end gap-2">
          {!user && (
            <>
              <Link
                to="/login"
                className="btn btn-ghost btn-sm rounded-full normal-case"
              >
                Login
              </Link>
              {/* প্রিমিয়াম Register বাটন */}
              <Link
                to="/register"
                className="
                  btn btn-sm rounded-full normal-case border-0
                  bg-gradient-to-r from-primary to-orange-500
                  text-white shadow-md hover:shadow-lg
                  hover:scale-[1.03] active:scale-95
                  transition-transform duration-150
                "
              >
                Register
              </Link>
            </>
          )}

          {user && (
            <div className="flex items-center gap-2">
              {/* Desktop user name (optional) */}
              <div className="hidden md:block text-right">
                <p className="text-sm font-semibold leading-tight">
                  {user.displayName || "Foodie"}
                </p>
                <p className="text-xs text-gray-500">
                  {user.email?.slice(0, 22)}
                  {user.email?.length > 22 ? "..." : ""}
                </p>
              </div>

              {/* Avatar Dropdown */}
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full border-2 border-primary">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="User avatar" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold">
                        {userInitial}
                      </div>
                    )}
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[10] menu menu-sm dropdown-content bg-base-100 rounded-box shadow w-56"
                >
                  <li className="px-4 py-3 border-b border-base-200">
                    <p className="text-sm font-semibold">
                      {user.displayName || "Foodie User"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user.email}
                    </p>
                  </li>
                  <li>
                    <NavLink to="/add-review">Add Review</NavLink>
                  </li>
                  <li>
                    <NavLink to="/my-reviews">My Reviews</NavLink>
                  </li>
                  <li>
                    <NavLink to="/my-favorites">My Favorites</NavLink>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-error font-medium"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
