import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useStateContext } from '../contexts/ContextProvider';
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import PatientsList from './PatientsList';
import {
  getPatients,
  addPtients,
  resetReducerPatients,
} from '../reducers/patientSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { patientSchema } from '../schema/formSchema';
import { toast } from 'react-toastify';

export default function Patients() {
  const { currentColor } = useStateContext();
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const createdBy = user._id;
  const [isPatient, setIsPatient] = useState('patient');
  const { isSuccessAddPtients, messageAddPtients, isErrorAddPtients } =
    useSelector((state) => state.patient);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({ mode: 'onTouched', resolver: yupResolver(patientSchema) });

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
  };

  const watchFirstName = watch('firstName');
  const watchLastName = watch('lastName');
  const watchEmail = watch('email');
  const watchAge = watch('age');
  const watchGender = watch('gender');
  const watchRegion = watch('region');
  const watchCity = watch('city');
  const watchPostalCode = watch('postalCode');
  const watchPhoneNumber = watch('phoneNumber');

  const check =
    watchFirstName === undefined ||
    watchLastName === undefined ||
    watchEmail === undefined ||
    watchAge === undefined ||
    watchGender === undefined ||
    watchCity === undefined ||
    watchPhoneNumber === undefined ||
    watchPostalCode === undefined ||
    watchRegion === undefined;

  const handleCancel = async () => {
    setShowModal(false);
    reset();
  };

  useEffect(() => {
    dispatch(getPatients());
  }, [dispatch]);

  useEffect(() => {
    if (isErrorAddPtients) {
      toast.error(messageAddPtients);
      setShowModal(true);
    }

    if (isSuccessAddPtients) {
      toast.success(messageAddPtients);
      setShowModal(false);
      reset();
    }
    if (messageAddPtients) {
      dispatch(getPatients());
    }
    dispatch(resetReducerPatients());
  }, [
    reset,
    isErrorAddPtients,
    isSuccessAddPtients,
    dispatch,
    messageAddPtients,
  ]);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <div className="flex justify-between">
        <Header category="Page" title="Patients" />

        <button
          onClick={() => setShowModal(true)}
          type="button"
          className=" mb-10 mt-8 text-sm font-semibold text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
          style={{ backgroundColor: currentColor, borderRadius: '10px' }}
        >
          <div className="flex  justify-center ">
            <FaPlus className=" mr-2 pt-1 " />
            Add Patient
          </div>
        </button>
      </div>
      <PatientsList />

      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-50 outline-none focus:outline-none">
                <div className="flex items-start justify-between p-4 solid border-gray-50 rounded-t ">
                  <h3 className="text-lg font-semibold">Add new patient</h3>
                </div>
                <div className="relative flex-auto">
                  <form onSubmit={handleSubmit(formSubmitHandler)}>
                    <div className="overflow-hidden  sm:rounded-md">
                      <div className=" bg-gray-50 px-4 ">
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
                              name="firstName"
                              id="firstName"
                              autoComplete="firstName"
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
                            />{' '}
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
                            />{' '}
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
                            />{' '}
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
                            </select>{' '}
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
                            />{' '}
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
                            />{' '}
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
                            />{' '}
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
                            />{' '}
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
                          style={{
                            borderRadius: '10px',
                          }}
                          className="text-white justify-center  border border-transparent bg-red-500 active:bg-red-700 font-medium px-4 py-2 text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none mr-4 mb-1"
                          type="button"
                          onClick={handleCancel}
                        >
                          Cancel
                        </button>

                        <button
                          style={{
                            borderRadius: '10px',
                            backgroundColor: !check
                              ? currentColor
                              : currentColor,
                            opacity: !check ? '' : 0.25,
                          }}
                          disabled={check}
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium
                            text-white shadow-sm"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
