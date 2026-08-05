import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import toast from "react-hot-toast";
const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await loginUser(formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
    "user",
    JSON.stringify(response.data.user)
);
        toast.success(response.data.message);
        setTimeout(() => {
    navigate("/");
}, 1000);
    } catch (error) {

        toast.error(
            error.response?.data?.message || "Something went wrong"
        );

    }
};
  return (
    <>
      {/* Login Page */}
      <div className='min-h-screen items-center justify-center flex'>
        {/* Login Container */}
        <div className='bg-white rounded-xl shadow-xl px-10 py-8 w-full max-w-md'>
          {/* Login heading */}
          <h1 className='text-3xl font-bold text-center'>Login</h1>
          {/* Login SubHeading */}
          <h2 className="text-gray-400 text-center mt-2">Login to your ShopSphere account.</h2>
          {/* Login form */}
          <form onSubmit={handleSubmit} className='mt-8 space-y-4'>
            <input
              type="email"
              placeholder="Email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-300"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-300"
            />
            <button type="submit" className="w-full bg-blue-300 text-white py-3 rounded-lg hover:bg-blue-400 transition-all active:scale-95 ">Login</button>
          </form>
          <p type="submit" className='text-center mt-6 text-gray-400'>
            Not Registered? <Link to="/register" className='text-blue-500 hover:underline font-medium'>Register</Link>
          </p>  
        </div>
      </div>
    </>
  );
};

export default Login;
