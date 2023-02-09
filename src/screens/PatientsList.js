import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetReducerPatients,
  getPatients,
  delPatient,
  editPatients,
} from '../reducers/patientSlice';
import DataTable from 'react-data-table-component';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { patientSchema } from '../schema/formSchema';
import { MdOutlineCancel } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useStateContext } from '../contexts/ContextProvider';

export default function PatientsList() {
  const {
    patientsList,
    messageEditPatients,
    isErrorEditPatients,
    isSuccessEditPatients,
    messageDelPatient,
    isSuccessDelPatient,
    isErrorDelPatient,
  } = useSelector((state) => state.patient);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [region, setRegion] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [isPatient, setIsPatient] = useState('patient');
  const [patientId, setPatientId] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [nameTODelete, setNameTODelete] = useState(false);
  const { currentColor } = useStateContext();

  const { user } = useSelector((state) => state.auth);
  const createdBy = user._id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPatients());
  }, [dispatch]);

  const customStyles = {
    header: {
      style: {
        minHeight: '56px',
      },
    },
    headRow: {
      style: {
        // borderTopStyle: 'solid',
        // borderTopWidth: '1px',
      },
    },
    headCells: {
      style: {
        // borderRightStyle: 'solid',
        // borderRightWidth: '1px',
        color: 'black',
        fontSize: '14px',
      },
    },
    cells: {
      style: {
        // borderRightStyle: 'solid',
        // borderRightWidth: '1px',
        width: '180px',
      },
    },
  };

  const handleCancel = async () => {
    setShowModal(false);
    reset();
  };
  const handleDeleteCancel = async () => {
    setShowDeleteModal(false);
  };
  const handleDelete = () => {
    dispatch(delPatient(patientId));
  };
  const handleDeleteInfo = async (row) => {
    setNameTODelete(row.firstName);
    setPatientId(row._id);
  };
  const handleEdit = async (value) => {
    setFirstName(value.firstName);
    setLastName(value.lastName);
    setEmail(value.email);
    setPhoneNumber(value.phoneNumber);
    setGender(value.gender);
    setAge(value.age);
    setCity(value.city);
    setRegion(value.region);
    setPostalCode(value.postalCode);
    setPatientId(value._id);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({ mode: 'onTouched', resolver: yupResolver(patientSchema) });

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
    (watchFirstName === firstName || watchFirstName === undefined) &&
    (watchLastName === lastName || watchLastName === undefined) &&
    (watchEmail === email || watchEmail === undefined) &&
    (watchAge === age || watchAge === undefined) &&
    (watchGender === gender || watchGender === undefined) &&
    (watchCity === city || watchCity === undefined) &&
    (watchPhoneNumber === phoneNumber || watchPhoneNumber === undefined) &&
    (watchPostalCode === postalCode || watchPostalCode === undefined) &&
    (watchRegion === region || watchRegion === undefined);

  const formSubmitHandler = (data) => {
    dispatch(
      editPatients({
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
        patientId,
      })
    );
  };

  useEffect(() => {
    if (isErrorEditPatients) {
      toast.error(messageEditPatients);
      setShowModal(true);
    }

    if (isSuccessEditPatients) {
      toast.success(messageEditPatients);
      setShowModal(false);
      reset();
    }
    if (messageEditPatients) {
      dispatch(getPatients());
    }
    dispatch(resetReducerPatients());
  }, [
    reset,
    isErrorEditPatients,
    isSuccessEditPatients,
    dispatch,
    messageEditPatients,
  ]);

  useEffect(() => {
    if (isErrorDelPatient) {
      toast.error(messageDelPatient);
      setShowDeleteModal(true);
    }

    if (isSuccessDelPatient) {
      toast.success(messageDelPatient);
      setShowDeleteModal(false);
      reset();
    }
    if (messageDelPatient) {
      dispatch(getPatients());
    }
    dispatch(resetReducerPatients());
  }, [
    reset,
    isErrorDelPatient,
    isSuccessDelPatient,
    dispatch,
    messageDelPatient,
  ]);

  const columns = [
    {
      name: 'First Name',
      selector: (row) => row.firstName,
    },
    {
      name: 'Last Name',
      selector: (row) => row.lastName,
    },

    {
      name: 'Email',
      selector: (row) => row.email,
    },
    {
      name: 'Phone',
      selector: (row) => row.phoneNumber,
    },
    {
      name: 'Age',
      selector: (row) => row.age,
    },
    {
      name: 'Gender',
      selector: (row) => row.gender,
    },
    {
      name: 'City',
      selector: (row) => row.city,
    },
    {
      name: 'Region',
      selector: (row) => row.region,
    },
    {
      name: 'Postal Code',
      selector: (row) => row.postalCode,
    },
    {
      name: 'Actions      ',
      cell: (row) => (
        <>
          <button
            onClick={() => {
              setShowModal(true);
              handleEdit(row);
            }}
            type="button"
            style={{ background: currentColor, borderRadius: '50%' }}
            className="text-sm text-white p-1 hover:drop-shadow-xl hover:bg-light-gray mr-1"
          >
            <AiOutlineEdit size="1rem" />
          </button>

          <button
            onClick={() => {
              setShowDeleteModal(true);
              handleDeleteInfo(row);
            }}
            type="button"
            style={{ background: 'red', borderRadius: '50%' }}
            className="text-sm text-white p-1 hover:drop-shadow-xl hover:bg-light-gray"
          >
            <AiOutlineDelete size="1rem" />
          </button>
        </>
      ),
      sortable: true,
    },
  ];
  return (
    <>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-50 outline-none focus:outline-none">
                <div className="flex items-start justify-between p-4 solid border-gray-50 rounded-t ">
                  <h3 className="text-lg font-semibold">Update patient</h3>
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
                              defaultValue={firstName}
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
                              defaultValue={lastName}
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
                              defaultValue={email}
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
                              defaultValue={phoneNumber}
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
                              defaultValue={gender}
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
                              defaultValue={age}
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
                              defaultValue={city}
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
                              defaultValue={region}
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
                              defaultValue={postalCode}
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
                          className="text-white justify-center  border border-transparent bg-red-500 active:bg-red-700 font-medium px-4 py-2 text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none mr-4 mb-1"
                          type="button"
                          onClick={handleCancel}
                        >
                          Cancel
                        </button>

                        <button
                          style={{
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

      {showDeleteModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl -mt-10">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-50 outline-none focus:outline-none">
                <div className="flex items-start justify-end p-4 solid border-gray-50 rounded-t ">
                  {/* <h3 className="text-lg font-semibold">
                    Invite new assistant
                  </h3> */}

                  <button
                    type="button"
                    onClick={() => setShowDeleteModal(false)}
                    style={{ color: 'black' }}
                    className="text-xl rounded-full pt-1 hover:bg-light-gray  block "
                  >
                    <MdOutlineCancel />
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <form className=" px-8 pt-6 pb-8 w-full">
                    <div>
                      Are you sure you want to delete patient {nameTODelete}?
                    </div>
                  </form>
                </div>
                <div className="flex items-center justify-between p-3 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-white  bg-red-500 active:bg-red-700 font-semibold  px-4 py-2 text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={handleDeleteCancel}
                  >
                    Close
                  </button>
                  <button
                    style={{ backgroundColor: currentColor }}
                    className="text-white font-semibold  text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="submit"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      {patientsList && (
        <DataTable
          title="Patients List"
          columns={columns}
          data={patientsList}
          customStyles={customStyles}
          pagination
          selectableRows
          dense
        />
      )}
    </>
  );
}
