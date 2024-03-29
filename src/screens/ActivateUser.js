import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { activateAssistance } from '../reducers/assistantSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  getAssistantProfile,
  editAssistantProfile,
  resetAssisstanceReducer,
} from '../reducers/assistantSlice';
import { ToastContainer } from 'react-toastify';

export default function ActivateUser() {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isErrorActivateAssistance,
    messageActivateAssistance,
    isSuccessActivateAssistance,
  } = useSelector((state) => state.assistant);

  const handleSubmit = async () => {
    dispatch(activateAssistance(token));
    // navigate('/login');
  };
  useEffect(() => {
    if (isErrorActivateAssistance) {
      toast.error(messageActivateAssistance);
    }

    if (isSuccessActivateAssistance) {
      toast.success(messageActivateAssistance);

      navigate('/login');
      dispatch(resetAssisstanceReducer());
    }
  }, [
    isErrorActivateAssistance,
    isSuccessActivateAssistance,
    dispatch,
    messageActivateAssistance,
    navigate,
  ]);
  return (
    <>
      <ToastContainer />

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
              onClick={handleSubmit}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
