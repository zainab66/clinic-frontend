import React, { useEffect, useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { logout, resetReducer, getUserProfile } from '../reducers/authSlice';
import Button from '../components/Button';
import { userProfileData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import avatar from '../data/avatar.jpg';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function UserProfile() {
  const { currentColor } = useStateContext();
  const { user, userProfile } = useSelector((state) => state.auth);
  const { setIsClicked, initialState } = useStateContext();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetReducer());
    navigate('/');
  };

  const handleProfileBtn = () => {
    setIsClicked(initialState);
    navigate('profile');
  };

  useEffect(() => {
    dispatch(getUserProfile(user._id));
  }, [dispatch, user]);

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={`https://xi-bucket.s3.ca-central-1.amazonaws.com/${userProfile.image}`}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200">
            {' '}
            {userProfile.name}
          </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            {' '}
            {userProfile.role}
          </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
            {' '}
            {userProfile.email}
          </p>
        </div>
      </div>
      <div>
        {userProfileData.map((item, index) => (
          <div
            onClick={handleProfileBtn}
            key={index}
            className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]"
          >
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className=" text-xl rounded-lg p-3 hover:bg-light-gray"
            >
              {item.icon}
            </button>

            <div>
              <p className="font-semibold dark:text-gray-200 ">{item.title}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400">
                {' '}
                {item.desc}{' '}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <button
          onClick={handleLogout}
          type="button"
          className={` mb-10 mt-8  w-full font-semibold text-white p-3 hover:drop-shadow-xl hover:bg-${currentColor} focus:bg-${currentColor}`}
          style={{
            backgroundColor: currentColor,
            borderRadius: '10px',
            color: 'white',
          }}
        >
          Logout
        </button>

        {/* <Button
          onClick={handleLogout}
          color="white"
          bgColor={currentColor}
          text="Logout"
          borderRadius="10px"
          width="full"
        /> */}
      </div>
    </div>
  );
}
