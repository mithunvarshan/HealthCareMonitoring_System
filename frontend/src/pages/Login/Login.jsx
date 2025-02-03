import { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext'; // Adjust the import path as necessary
import axios from 'axios'; 
import { toast } from 'react-toastify'; 
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { setToken, backendUrl } = useContext(AppContext); // Get setToken and backendUrl from context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [state, setState] = useState('Login'); // Toggle between 'Login' and 'Sign Up'
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === 'Sign Up') {
        // Handle sign up logic
        const response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });

        if (response.data.success) {
          toast.success("Account created successfully! Please log in."); 
          setState('Login'); // Switch to Login after successful signup
        } else {
          toast.error(response.data.message || "Sign up failed.");
        }
      } else {
        // Handle login logic
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token); // Set the token in context
          toast.success("Login successful!"); 
          navigate('/');
        } else {
          toast.error(response.data.message || "Login failed.");
          setState('Sign Up'); // Switch to Sign Up if login fails
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again."); 
      setState('Sign Up'); // Switch to Sign Up on error
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-zinc-300 rounded-md'>
        <p className='text-2xl font-semibold'>
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </p>
        <p>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book an appointment</p>

        {state === 'Sign Up' && (
          <div className='w-full'>
            <p>Full Name</p>
            <input
              className='border border-zinc-300 rounded w-full p-2 mt-1'
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>
        )}

        <div className='w-full'>
          <p>Email</p>
          <input
            className='border border-zinc-300 rounded w-full p-2 mt-1'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required    
          />
        </div>

        <div className='w-full'>
          <p>Password</p>
          <input
            className='border border-zinc-300 rounded w-full p-2 mt-1'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className='bg-primary text-white w-full py-2 rounded-md text-base mt-4'
        >
          {state === 'Sign Up' ? 'Sign Up' : 'Login'}
        </button>

        <p className='text-sm mt-4'>
          {state === 'Sign Up' ? (
            <>
              Already have an account?{' '}
              <span onClick={() => setState('Login')} className='text-primary cursor-pointer'>
                Login here
              </span>
            </>
          ) : (
            <>
              Create a new account?{' '}
              <span onClick={() => setState('Sign Up')} className='text-primary cursor-pointer'>
                Sign Up
              </span>
            </>
          )}
        </p>
      </div>
    </form>
  );
};

export default Login;
