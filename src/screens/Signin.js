import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, resetReducer } from '../reducers/authSlice';
import { LockClosedIcon } from '@heroicons/react/20/solid';
import { userSchema } from '../schema/formSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function Signin() {
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
    resolver: yupResolver(userSchema),
  });

  const formSubmitHandler = (data) => {
    dispatch(
      login({
        email: data.email,
        password: data.password,
      })
    );
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (user || isSuccess) {
      navigate('/dashboard');
      reset();
    }

    dispatch(resetReducer());
  }, [user, navigate, message, isError, isSuccess, dispatch, reset]);

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=blue&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form
            noValidate="novalidate"
            className="mt-8 space-y-6"
            onSubmit={handleSubmit(formSubmitHandler)}
          >
            <div className="-space-y-px rounded-md shadow-sm">
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

            <div className="flex items-center justify-end">
              {/* <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div> */}

              <div className="text-sm">
                <a
                  href="/forgetPassword"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                    aria-hidden="true"
                  />
                </span>
                Sign in
              </button>

              <div className="flex items-center justify-end mt-4">
                <div className="text-sm">
                  {' '}
                  Don't have an account?
                  <a
                    href="/register"
                    className="font-medium text-blue-600 hover:text-blue-500 ml-1"
                  >
                    Sign up!
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
