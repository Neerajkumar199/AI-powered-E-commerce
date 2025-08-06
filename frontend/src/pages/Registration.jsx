import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from "/vcart logo.png";
import google from '../assets/google.png';
import { IoEyeOutline, IoEye } from "react-icons/io5";
import { authDataContext } from '../context/authContext';
import axios from 'axios';

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
        serverUrl + '/api/auth/registration',
        { name, email, password },
        { withCredentials: true } // ✅ Fixed here
      );
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-b from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start'>

      {/* Logo Section */}
      <div className='w-full h-[80px] flex items-center justify-start px-5 gap-2 cursor-pointer' onClick={() => navigate("/")}>
        <img className="w-[40px]" src={Logo} alt="Logo" />
        <h1 className='text-2xl font-sans'>OneCart</h1>
      </div>

      {/* Header */}
      <div className='w-full h-[100px] flex flex-col items-center justify-center gap-2'>
        <span className='text-[25px] font-semibold'>Registration Page</span>
        <span>Welcome to OneCart, Place your order</span>
      </div>

      {/* Registration Card */}
      <div className='max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex flex-col items-center justify-start py-6'>
        <form onSubmit={handleSignup} className='w-[70%] h-full flex flex-col items-center justify-start gap-5'>

          {/* Google Button */}
          <div className='w-full h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-3 px-4 cursor-pointer'>
            <img src={google} alt="Google" className='w-[25px]' />
            <span>Register with Google</span>
          </div>

          {/* Divider */}
          <div className='w-full flex items-center justify-center gap-2 text-sm text-gray-300'>
            <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
            OR
            <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
          </div>

          {/* Inputs */}
          <div className='w-full flex flex-col gap-4 relative'>

            <input
              type="text"
              className='w-full h-[45px] border border-[#96969963] rounded-lg bg-transparent placeholder-[#ffffffc7] px-4 font-semibold shadow'
              placeholder='Username'
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />

            <input
              type="email"
              className='w-full h-[45px] border border-[#96969963] rounded-lg bg-transparent placeholder-[#ffffffc7] px-4 font-semibold shadow'
              placeholder='Email'
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <div className='relative w-full'>
              <input
                type={show ? "text" : "password"}
                className='w-full h-[45px] border border-[#96969963] rounded-lg bg-transparent placeholder-[#ffffffc7] px-4 font-semibold shadow'
                placeholder='Password'
                required
                onChange={(e) => setPassword(e.target.value)} // ✅ Fixed
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

            <button
              type="submit"
              className='w-full h-[45px] bg-[#6060f5] rounded-lg text-[16px] font-semibold mt-2'
            >
              Create Account
            </button>

            <p className='h-[30px] text-sm mt-2 flex items-center justify-center'> {/* ✅ Fixed class */}
              Already have an account?{" "}
              <span
                className='text-[#5555f6cf] font-semibold cursor-pointer ml-1'
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>

          </div>
        </form>
      </div>
    </div>
  );
}

export default Registration;
