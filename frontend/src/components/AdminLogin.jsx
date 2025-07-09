import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const ADMIN_EMAIL = "admin@example.com"; // ✅ Replace with your actual admin email

const AdminLogin = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const isAdmin = user.email === ADMIN_EMAIL;
        localStorage.setItem("token", user.accessToken);
        localStorage.setItem("isAdmin", isAdmin);

        // ✅ Redirect once authenticated
        navigate(isAdmin ? "/admin" : "/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.warn("Please fill all fields");
      return;
    }

    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success("Signup successful!");
      } else {
        const userCred = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const isAdmin = userCred.user.email === ADMIN_EMAIL;
        localStorage.setItem("token", userCred.user.accessToken);
        localStorage.setItem("isAdmin", isAdmin);
        toast.success("Login successful!");
        setTimeout(() => {
          navigate(isAdmin ? "/admin" : "/");
        }, 1000);
      }
    } catch (err) {
      console.error("Authentication error:", err.message);
      toast.error(err.message);
    }
  };

  const toggleMode = () => {
    setIsSignup((prev) => !prev);
    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isSignup ? "Sign Up" : "Login"}
        </h2>

        {isSignup && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full p-2 mb-4 border rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 mb-6 border rounded"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>

        <div className="mt-4 text-center text-sm">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={toggleMode}
            className="text-blue-600 hover:underline"
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
