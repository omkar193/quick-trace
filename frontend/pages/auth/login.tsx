import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaLock } from "react-icons/fa";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError(""); // Clear previous errors

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Store token and user info
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("role", data.user.role);

        // ✅ FIX: Allow both admin and delivery roles to access the delivery dashboard
        const redirectPath =
          data.user.role === "customer"
            ? "/dashboard/customer"
            : "/dashboard/delivery"; // ✅ Admins & delivery partners go here

        router.push(redirectPath);
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "350px" }}>
        <h2 className="text-center text-primary mb-4">Welcome! Login</h2>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        <div className="mb-3">
          <label className="form-label fw-bold">Email</label>
          <div className="input-group">
            <span className="input-group-text">
              <FaUser />
            </span>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Password</label>
          <div className="input-group">
            <span className="input-group-text">
              <FaLock />
            </span>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button className="btn btn-primary w-100" onClick={handleLogin}>
          Login
        </button>

        <div className="text-center mt-3">
          <small>
            Don`t have an account?{" "}
            <Link href="/auth/register" className="text-decoration-none">
              Sign up
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}
