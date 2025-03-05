import Link from "next/link";
import dynamic from "next/dynamic";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaBoxOpen, FaTruck, FaClock } from "react-icons/fa";

// ✅ Only import if used
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import deliveryAnimation from "@/public/delivery-animation.json"; // ✅ Ensure this is used

export default function Home() {
  return (
    <div className="container vh-100 d-flex flex-column justify-content-center align-items-center">
      {/* Hero Section */}
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center text-center">
          <h1 className="fw-bold text-primary">
            Quick-Trace: Fast & Reliable Order Tracking 🚀
          </h1>
          <p className="text-muted">
            Seamless order placement and real-time delivery tracking.
          </p>
          <div className="mt-3">
            <Link href="/auth/register" className="btn btn-success me-2">
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

        {/* ✅ Fixed: Lottie Animation is now included */}
        <div className="col-md-6 d-flex justify-content-center">
          <Lottie
            animationData={deliveryAnimation}
            loop={true}
            style={{ height: 300 }}
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="row mt-5 text-center">
        <div className="col-md-4">
          <FaBoxOpen className="text-primary" size={50} />
          <h4>Easy Order Placement</h4>
          <p>Customers can place orders seamlessly with just a few clicks.</p>
        </div>
        <div className="col-md-4">
          <FaTruck className="text-success" size={50} />
          <h4>Live Delivery Tracking</h4>
          <p>Stay updated with real-time order statuses.</p>
        </div>
        <div className="col-md-4">
          <FaClock className="text-warning" size={50} />
          <h4>Fast & Secure</h4>
          <p>Secure transactions and efficient delivery system.</p>
        </div>
      </div>
    </div>
  );
}
