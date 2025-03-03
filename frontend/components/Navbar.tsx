import Link from "next/link";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa"; // Import icons from react-icons

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <div className="container">
        <Link className="navbar-brand" href="/">
          Quick-Trace
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
          </ul>
        </div>
      </div>
    </nav>
  );
}
