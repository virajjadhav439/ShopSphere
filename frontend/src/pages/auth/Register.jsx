import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from "../../services/authService";
import toast from 'react-hot-toast';
const  Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (formData.password !== formData.confirmPassword) {
        return toast.error("Passwords do not match");
    }

    const response = await registerUser(formData);

    toast.success(response.data.message);

    toast.success(response.data.message);

setTimeout(() => {
    navigate("/login");
}, 1000);
} catch (error) {

    toast.error(
        error.response?.data?.message || "Something went wrong"
    );

}
  };
  return (
    <>
      {/* Register Page */}
      <div className='min-h-screen items-center justify-center flex'>
        {/* Register Container */}
        <div className='bg-white rounded-xl shadow-xl px-10 py-8 w-full max-w-md'>
          {/* Register heading */}
          <h1 className='text-3xl font-bold text-center'>Register</h1>
          {/* Register SubHeading */}
          <h2 className="text-gray-400 text-center mt-2">Create an account to start shopping.</h2>
          {/* Register form */}
          <form onSubmit={handleSubmit} className='mt-8 space-y-4'>
            <input
              type="text"
              placeholder="Name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-300"
            />
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
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-300"
            />
            <button type="submit" className="w-full bg-blue-300 text-white py-3 rounded-lg hover:bg-blue-400 transition-all active:scale-95 " >Register</button>
          </form>
          <p className='text-center mt-6 text-gray-400'>
  Already Registered?{" "}
  <Link to="/login" className='text-blue-500 hover:underline font-medium'>
    Login
  </Link>
</p>
        </div>
      </div>
    </>
  )
}

export default Register