import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaBoxOpen, FaTruck, FaClock } from "react-icons/fa";

export default function Home() {
  return (
    <div className="container-fluid d-flex flex-column min-vh-100 overflow-auto">
      {/* ✅ Hero Section */}
      <div className="row flex-grow-1 align-items-center justify-content-center">
        {/* Left Section (9 parts on large screens, full width on small screens) */}
        <div className="col-lg-9 col-md-8 col-sm-12 d-flex flex-column align-items-center text-center">
          <h1 className="fw-bold text-primary">
            Quick-Trace: Fast & Reliable Order Tracking 🚀
          </h1>
          <p className="text-muted">
            Seamless order placement and real-time delivery tracking.
          </p>
          <div className="d-flex justify-content-center gap-3 mt-3">
            <Link href="/auth/register" className="btn btn-success">
              Get Started
            </Link>
            <Link
              href="/dashboard/customer"
              className="btn btn-outline-primary"
            >
              Track Orders
            </Link>
          </div>
        </div>

        {/* Right Section (Animation: 3 parts on large screens, full width on small screens) */}
        {/* <div className="col-lg-3 col-md-4 col-sm-12 d-flex justify-content-center mt-3 mt-md-0">
          <Lottie
            animationData={deliveryAnimation}
            loop
            className="img-fluid"
            style={{ maxWidth: "100%", height: "auto", maxHeight: "300px" }}
          />
        </div> */}
      </div>

      {/* ✅ Features Section */}
      <div className="row text-center w-100 mt-4 pb-3">
        <div className="col-md-4 col-sm-12 mb-3">
          <FaBoxOpen className="text-primary" size={50} />
          <h4>Easy Order Placement</h4>
          <p>Customers can place orders seamlessly with just a few clicks.</p>
        </div>
        <div className="col-md-4 col-sm-12 mb-3">
          <FaTruck className="text-success" size={50} />
          <h4>Live Delivery Tracking</h4>
          <p>Stay updated with real-time order statuses.</p>
        </div>
        <div className="col-md-4 col-sm-12 mb-3">
          <FaClock className="text-warning" size={50} />
          <h4>Fast & Secure</h4>
          <p>Secure transactions and efficient delivery system.</p>
        </div>
      </div>
    </div>
  );
}
