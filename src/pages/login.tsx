import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { APP_TITLE } from "../constants/generalConstants";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during Login:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <form
        className="card w-full max-w-md shadow-2xl bg-base-100 p-10 space-y-6"
        onSubmit={handlogin}
      >
        <h2 className="text-3xl font-extrabold mb-2 text-center text-primary">
          {APP_TITLE}
        </h2>
        <div className="form-control flex flex-col space-y-2">
          <label className="label">
            <span className="label-text text-base font-medium">Email</span>
          </label>
          <input
            type="email"
            name="email"
            className="input input-bordered input-primary w-full"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
            placeholder="Enter your email"
          />
        </div>
        <div className="form-control flex flex-col space-y-2">
          <label className="label">
            <span className="label-text text-base font-medium">Password</span>
          </label>
          <input
            type="password"
            name="password"
            className="input input-bordered input-primary w-full"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full text-base font-semibold tracking-wide"
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm mr-2"></span>
          ) : null}
          {loading ? "Logging In ..." : "Login"}
        </button>
        <div className="text-center text-sm text-gray-400 mt-2">
          Don't have an account?{" "}
          <a href="/signup" className="text-primary hover:underline">
            <button
              type="button"
              className="btn btn-link p-0 min-h-0 h-auto align-baseline text-primary"
            >
              Signup
            </button>
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
