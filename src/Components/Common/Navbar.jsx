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
      toast.error("Logout failed. Try again.");
      console.log(error)
    }
  };

  const userInitial =
    user?.displayName?.charAt(0)?.toUpperCase() ||
    user?.email?.charAt(0)?.toUpperCase() ||
    "U";

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

      {user && (
        <>
          <li>
            <NavLink
              to="/add-review"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-semibold"
                  : "hover:text-primary transition"
              }
            >
              Add Review
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-reviews"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-semibold"
                  : "hover:text-primary transition"
              }
            >
              My Reviews
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-favorites"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-semibold"
                  : "hover:text-primary transition"
              }
            >
              My Favorites
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="bg-base-100/90 backdrop-blur border-b border-base-200 relative z-50">
      <div className="navbar max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        {/* LEFT */}
        <div className="navbar-start">
          {/* Mobile menu */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-3 shadow bg-base-100 rounded-box w-56 z-50"
            >
              {navLinks}

              {user && (
                <>
                  <div className="divider my-3" />

                  <li>
                    <button
                      onClick={handleLogout}
                      className="
                        w-full flex items-center gap-2 px-4 py-2 
                        rounded-xl bg-gradient-to-r from-red-500 to-red-600 
                        text-white font-medium shadow-md hover:shadow-lg 
                        hover:scale-[1.03] active:scale-95 transition-all
                      "
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth='2'
                      >
                        <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' />
                        <polyline points='16 17 21 12 16 7' />
                        <line x1='21' y1='12' x2='9' y2='12' />
                      </svg>
                      Logout
                    </button>
                  </li>
                </>
              )}
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

        {/* CENTER */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-3">{navLinks}</ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-end gap-3">
          {!user && (
            <>
              <Link
                to="/login"
                className="btn btn-ghost btn-sm rounded-full normal-case"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="
                  btn btn-sm rounded-full normal-case border-0
                  bg-gradient-to-r from-primary to-orange-500
                  text-white shadow-md hover:shadow-lg
                  hover:scale-[1.05] active:scale-95
                  transition-transform duration-150
                "
              >
                Register
              </Link>
            </>
          )}

          {user && (
            <div className="flex items-center gap-2">
              <div className="hidden md:block text-right">
                <p className="text-sm font-semibold leading-tight">
                  {user.displayName || "Foodie"}
                </p>
                <p className="text-xs text-gray-500">
                  {user.email?.slice(0, 20)}
                  {user.email?.length > 20 && "..."}
                </p>
              </div>

              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
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
                  className="mt-3 p-3 menu menu-sm dropdown-content bg-base-100 rounded-box shadow w-56 z-50"
                >
                  <li className="px-2 py-2 border-b border-base-200">
                    <p className="text-sm font-semibold">
                      {user.displayName || "Foodie User"}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
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

                  <li className="mt-2">
                    <button
                      onClick={handleLogout}
                      className="
                        w-full flex items-center gap-2 px-4 py-2 
                        rounded-xl bg-gradient-to-r from-red-500 to-red-600 
                        text-white font-medium shadow-md hover:shadow-lg 
                        hover:scale-[1.03] active:scale-95 transition-all
                      "
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth='2'
                      >
                        <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' />
                        <polyline points='16 17 21 12 16 7' />
                        <line x1='21' y1='12' x2='9' y2='12' />
                      </svg>
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
