import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from "/vcart logo.png";
import google from '../assets/google.png';
import { IoEyeOutline, IoEye } from "react-icons/io5";
import { authDataContext } from '../context/authContext';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';

function Registration() {
  const [show, setShow] = useState(false);
  const { serverUrl } = useContext(authDataContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/registration`,
        { name, email, password },
        { withCredentials: true }
      );
      console.log("✅ Registration success:", result.data);
      // Redirect after success
      navigate("/login");
    } catch (error) {
      console.error("❌ Registration error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  const googleSignup = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;

      const result = await axios.post(
        `${serverUrl}/api/auth/googlelogin`,
        { name: user.displayName, email: user.email },
        { withCredentials: true }
      );

      console.log("✅ Google login complete:", result.data);
      navigate("/");
    } catch (error) {
      console.error("❌ Google login error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      alert(error.response?.data?.message || "Google signup failed");
    }
  };

  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-b from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start'>
      {/* Logo */}
      <div
        className='w-full h-[80px] flex items-center justify-start px-5 gap-2 cursor-pointer'
        onClick={() => navigate("/")}
      >
        <img className="w-[40px]" src={Logo} alt="Logo" />
        <h1 className='text-2xl font-sans'>OneCart</h1>
      </div>

      {/* Header */}
      <div className='w-full h-[100px] flex flex-col items-center justify-center gap-2'>
        <span className='text-[25px] font-semibold'>Registration Page</span>
        <span>Welcome to OneCart, Place your order</span>
      </div>

      {/* Registration Card */}
      <div className='max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border border-[#96969635] rounded-lg shadow-lg flex flex-col items-center justify-start py-6'>
        <form onSubmit={handleSignup} className='w-[70%] h-full flex flex-col items-center justify-start gap-5'>

          {/* Google Signup */}
          <div
            className='w-full h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-3 px-4 cursor-pointer'
            onClick={googleSignup}
          >
            <img src={google} alt="Google" className='w-[25px]' />
            <span>Register with Google</span>
          </div>

          {/* Divider */}
          <div className='w-full flex items-center justify-center gap-2 text-sm text-gray-300'>
            <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
            OR
            <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
          </div>

          {/* Name */}
          <input
            type="text"
            className='w-full h-[45px] border border-[#96969963] rounded-lg bg-transparent placeholder-[#ffffffc7] px-4 font-semibold shadow'
            placeholder='Username'
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />

          {/* Email */}
          <input
            type="email"
            className='w-full h-[45px] border border-[#96969963] rounded-lg bg-transparent placeholder-[#ffffffc7] px-4 font-semibold shadow'
            placeholder='Email'
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          {/* Password */}
          <div className='relative w-full'>
            <input
              type={show ? "text" : "password"}
              className='w-full h-[45px] border border-[#96969963] rounded-lg bg-transparent placeholder-[#ffffffc7] px-4 font-semibold shadow'
              placeholder='Password'
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {show ? (
              <IoEye
                className='absolute right-3 top-3 w-5 h-5 cursor-pointer text-gray-300'
                onClick={() => setShow(false)}
              />
            ) : (
              <IoEyeOutline
                className='absolute right-3 top-3 w-5 h-5 cursor-pointer text-gray-300'
                onClick={() => setShow(true)}
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className='w-full h-[45px] bg-[#6060f5] rounded-lg text-[16px] font-semibold mt-2'
          >
            Create Account
          </button>

          {/* Login Link */}
          <p className='h-[30px] text-sm mt-2 flex items-center justify-center'>
            Already have an account?{" "}
            <span
              className='text-[#5555f6cf] font-semibold cursor-pointer ml-1'
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Registration;
