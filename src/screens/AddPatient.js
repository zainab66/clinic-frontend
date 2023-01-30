import React from 'react';
import { useState } from 'react';
import { addPtients, reset } from '../reducers/patientSlice';
import { useDispatch, useSelector } from 'react-redux';
import { patientSchema } from '../schema/formSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

export default function AddPatient() {
  const [isPatient, setIsPatient] = useState(true);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const createdBy = user._id;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(patientSchema),
  });

  const formSubmitHandler = (data) => {
    dispatch(
      addPtients({
        email: data.email,
        firstName: data.firstName,
        phoneNumber: data.phoneNumber,
        lastName: data.lastName,
        age: data.age,
        gender: data.gender,
        city: data.city,
        region: data.region,
        postalCode: data.postalCode,
        isPatient,
        createdBy,
      })
    );
    reset();
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    reset();
  };
  return (
    <div className="border-0 rounded-lg relative flex flex-col w-full outline-none focus:outline-none">
      <div className="flex items-start justify-between p-5 solid border-gray-300 rounded-t ">
        <h3 className="text-lg font-semibold">Add new patient</h3>
      </div>
      <div className="relative p-3 flex-auto">
        <form
          action="#"
          method="POST"
          onSubmit={handleSubmit(formSubmitHandler)}
        >
          <div className="overflow-hidden  sm:rounded-md">
            <div className="bg-white px-4 py-5 sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register('firstName')}
                  />
                  {errors.firstName ? (
                    <span className="text-red-900 text-sm">
                      {errors.firstName.message}
                    </span>
                  ) : (
                    <></>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register('lastName')}
                  />
                  {errors.lastName ? (
                    <span className="text-red-900 text-sm">
                      {errors.lastName.message}
                    </span>
                  ) : (
                    <></>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <input
                    type="text"
                    name="email-address"
                    id="email-address"
                    autoComplete="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register('email')}
                  />
                  {errors.email ? (
                    <span className="text-red-900 text-sm">
                      {errors.email.message}
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    autoComplete="phoneNumber"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register('phoneNumber')}
                  />
                  {errors.phoneNumber ? (
                    <span className="text-red-900 text-sm">
                      {errors.phoneNumber.message}
                    </span>
                  ) : (
                    <></>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    autoComplete="gender"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register('gender')}
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {errors.gender ? (
                    <span className="text-red-900 text-sm">
                      {errors.gender.message}
                    </span>
                  ) : (
                    <></>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Age
                  </label>
                  <input
                    type="text"
                    name="age"
                    id="age"
                    autoComplete="age"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register('age')}
                  />
                  {errors.age ? (
                    <span className="text-red-900 text-sm">
                      {errors.age.message}
                    </span>
                  ) : (
                    <></>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    autoComplete="address-level2"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register('city')}
                  />
                  {errors.city ? (
                    <span className="text-red-900 text-sm">
                      {errors.city.message}
                    </span>
                  ) : (
                    <></>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium text-gray-700"
                  >
                    State / Province
                  </label>
                  <input
                    type="text"
                    name="region"
                    id="region"
                    autoComplete="address-level1"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register('region')}
                  />
                  {errors.region ? (
                    <span className="text-red-900 text-sm">
                      {errors.region.message}
                    </span>
                  ) : (
                    <></>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label
                    htmlFor="postalCode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    ZIP / Postal code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    id="postalCode"
                    autoComplete="postalCode"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register('postalCode')}
                  />
                  {errors.postalCode ? (
                    <span className="text-red-900 text-sm">
                      {errors.postalCode.message}
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
            <div className="px-4 py-3 text-right sm:px-6">
              <button
                className="text-white justify-center  border border-transparent bg-red-500 active:bg-red-700 font-medium px-4 py-2 text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none mr-4 mb-1"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2  hover:shadow-lg"
              >
                Add patient
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
