import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
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
        localStorage.setItem("token", data.token); // ✅ Store JWT Token
        localStorage.setItem("user", JSON.stringify(data.user)); // ✅ Store User Info
        localStorage.setItem("role", data.user.role); // ✅ Store Role

        router.push(
          data.user.role === "customer"
            ? "/dashboard/customer"
            : "/dashboard/delivery"
        );
      } else {
        setError(data.error || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error); // ✅ Logs error for debugging
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">Login</h1>
      {error && <p className="text-danger">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        className="form-control mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="form-control mb-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}
