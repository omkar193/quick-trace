import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSignInAlt, FaUserPlus, FaSignOutAlt, FaUser } from "react-icons/fa";
import { FaShippingFast } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(""); // Store user role
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setIsLoggedIn(true);
      setUserRole(JSON.parse(storedUser).role); // Extract user role
    } else {
      setIsLoggedIn(false);
    }
  }, [router.pathname]); // Run this effect when route changes

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    router.push("/auth/login"); // Redirect to login page
  };

  // Show login/register only on home, login, and register pages
  const showAuthLinks =
    router.pathname === "/" ||
    router.pathname.startsWith("/auth/login") ||
    router.pathname.startsWith("/auth/register");

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" href="/">
          <FaShippingFast className="me-2" size={24} /> {/* Icon before text */}
          <b>QuickTrace</b>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <span className="nav-link text-light d-flex align-items-center">
                    <FaUser className="me-1" /> {userRole.toUpperCase()}
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-light d-flex align-items-center"
                    onClick={handleLogout}
                    title="Logout"
                  >
                    <FaSignOutAlt className="me-1" /> Logout
                  </button>
                </li>
              </>
            ) : showAuthLinks ? (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link btn btn-light me-2 d-flex align-items-center"
                    href="/auth/login"
                    title="Login"
                  >
                    <FaSignInAlt className="me-1" /> Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link btn btn-light d-flex align-items-center"
                    href="/auth/register"
                    title="Register"
                  >
                    <FaUserPlus className="me-1" /> Register
                  </Link>
                </li>
              </>
            ) : null}
          </ul>
        </div>
      </div>
    </nav>
  );
}
