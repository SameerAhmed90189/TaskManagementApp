import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import "../styles/Auth.css";

function Register() {
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setError("");

    await api.post("/auth/register", formData);

    navigate("/");

  } catch (err) {

    setError(
      err.response?.data?.message ||
      "Something went wrong"
    );

    console.error(err);
  }
};

 return (
  <div className="auth-container">

    <div className="auth-card">

      <h1 className="auth-title">
        Register
      </h1>

      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >

        <input
          className="auth-input"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          className="auth-input"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {error && (
            <p className="error-message">
            {error}
            </p>
           )}

        <button
          className="auth-button"
          type="submit"
        >
          Register
        </button>

      </form>

      <Link
        className="auth-link"
        to="/"
      >
        Already have an account?
      </Link>

    </div>

  </div>
);
}

export default Register;