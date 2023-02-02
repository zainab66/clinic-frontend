import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup, resetReducer } from '../reducers/authSlice';
import { toast } from 'react-toastify';
import { signupSchema } from '../schema/formSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

export default function Signup() {
  const [role, setRole] = useState('admin');

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const formSubmitHandler = (data) => {
    dispatch(
      signup({
        name: data.userName,
        email: data.email,
        password: data.password,
        role,
      })
    );
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      toast.success(message);
      navigate('/login');
      dispatch(resetReducer());
      reset();
    }
  }, [user, isError, isSuccess, message, navigate, dispatch, reset]);

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign up to your account
            </h2>
          </div>
          <form
            noValidate="novalidate"
            className="mt-8 space-y-6"
            onSubmit={handleSubmit(formSubmitHandler)}
          >
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="Username" className="sr-only">
                  Username
                </label>
                <input
                  id="Username"
                  name="Username"
                  type="text"
                  autoComplete="Username"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  placeholder="Username"
                  {...register('userName')}
                />{' '}
                {errors.userName ? (
                  <span className="text-red-900 text-sm">
                    {errors.userName.message}
                  </span>
                ) : (
                  <></>
                )}
              </div>

              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  placeholder="Email address"
                  {...register('email')}
                />{' '}
                {errors.email ? (
                  <span className="text-red-900 text-sm">
                    {errors.email.message}
                  </span>
                ) : (
                  <></>
                )}
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  placeholder="Password"
                  {...register('password')}
                />{' '}
                {errors.password ? (
                  <span className="text-red-900 text-sm">
                    {errors.password.message}
                  </span>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                Have an account?
                <a
                  href="/login"
                  className="font-medium text-blue-600 hover:text-blue-500 ml-1"
                >
                  Sign in!
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
