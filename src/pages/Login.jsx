import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post("https://fakestoreapi.com/auth/login", {
        username: email,
        password: password,
      });
      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token);
        setSuccessMessage("Happy shopping!");
        document.getElementById("loginModal").showModal();
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      setErrorMessage(
        "Account not found. Make sure username & password are correct."
      );
      document.getElementById("loginModal").showModal();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-4xl font-bold text-center mb-8">Login</h1>
      <form className="space-y-4" onSubmit={handleLogin}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Notification Modal */}
      <dialog id="loginModal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box text-center">
          {errorMessage ? (
            <>
              <h3 className="font-bold text-lg text-red-500">Error!</h3>
              <p className="py-4">{errorMessage}</p>
            </>
          ) : (
            <>
              <h3 className="font-bold text-lg text-green-500">
                Login successful
              </h3>
              <p className="py-4">{successMessage}</p>
            </>
          )}
          <div className="modal-action justify-center">
            <button
              className="btn"
              onClick={() => document.getElementById("loginModal").close()}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Login;
