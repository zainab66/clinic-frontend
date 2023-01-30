import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { activateAssistance } from '../reducers/assistantSlice';
import { useDispatch } from 'react-redux';

export default function ActivateUser() {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    dispatch(activateAssistance(token));
    navigate('/login');
  };

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
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              You have been successfully activated.You can sign in now!{' '}
            </p>
          </div>
          <div>
            <button
              onClick={() => handleSubmit(true)}
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
