import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineCancel } from 'react-icons/md';
import Header from '../components/Header';
import { useStateContext } from '../contexts/ContextProvider';
import { FaPlus } from 'react-icons/fa';
import {
  updateUser,
  addUsers,
  deleteUser,
  getUsers,
  resetAssisstanceReducer,
} from '../reducers/assistantSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AssisstanceSchema, inviteSchema } from '../schema/formSchema';
import { toast } from 'react-toastify';

const Assistants = () => {
  const { currentColor } = useStateContext();
  const [showModal, setShowModal] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const createdBy = user._id;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [nameTODelete, setNameToDelete] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [region, setRegion] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [role, setRole] = useState('Assistant');
  const [assisstantId, setAssisstantId] = useState('');

  const {
    assistantsList,
    isError,
    isSuccess,
    message,
    deleteMessage,
    messageAddAssisstant,
  } = useSelector((state) => state.assistant);
  const [assistantId, setAssistantId] = useState('');

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(inviteSchema),
  });

  const formSubmitHandler = (data) => {
    if (data) {
      dispatch(
        addUsers({
          email: data.email,
          fullName: data.fullName,
          role,
          createdBy,
        })
      );
    }
  };
  const handelCancel = () => {
    setShowModal(false);
    reset();
  };
  const watchFullName = watch('fullName');
  const watchEmail = watch('email');

  const checkSubmitBtn =
    watchFullName === undefined || watchEmail === undefined;

  const handleDeleteCancel = async () => {
    setShowDeleteModal(false);
  };

  const handleDelete = () => {
    dispatch(deleteUser(assistantId));
  };

  const handleDeleteInfo = async (row) => {
    setNameToDelete(row.fullName);
    setAssistantId(row._id);
  };

  const handleEdit = async (value) => {
    setFullName(value.fullName);
    setEmail(value.email);
    setPhoneNumber(value.phoneNumber);
    setGender(value.gender);
    setAge(value.age);
    setCity(value.city);
    setRegion(value.region);
    setPostalCode(value.postalCode);
    setAssisstantId(value._id);
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (messageAddAssisstant === 'Invitation send successfully') {
      setShowModal(false);
      reset();
    }
  }, [messageAddAssisstant, reset, setShowModal]);

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
        width: '180px',
        // borderRightStyle: 'solid',
        // borderRightWidth: '1px',
      },
    },
  };

  const columns = [
    {
      name: 'Full Name',
      selector: (row) => row.fullName,
    },
    // {
    //   name: 'Last Name',
    //   selector: (row) => row.lastName,
    // },

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
              setShowEditModal(true);
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

  useEffect(() => {
    if (isError) {
      toast.error(deleteMessage);
      setShowDeleteModal(true);
    }

    if (isSuccess) {
      toast.success(deleteMessage);
      setShowDeleteModal(false);
    }
    if (deleteMessage) {
      dispatch(getUsers());
    }
    dispatch(resetAssisstanceReducer());
  }, [isError, isSuccess, message, dispatch, deleteMessage]);

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    watch: watchEdit,
    formState: { errors: errorsEdit },
    reset: resetEdit,
  } = useForm({ resolver: yupResolver(AssisstanceSchema) });

  const watchEditFullName = watchEdit('fullName');
  const watchEditEmail = watchEdit('email');
  const watchEditAge = watchEdit('age');
  const watchEditGender = watchEdit('gender');
  const watchEditRegion = watchEdit('region');
  const watchEditCity = watchEdit('city');
  const watchEditPostalCode = watchEdit('postalCode');
  const watchEditPhoneNumber = watchEdit('phoneNumber');

  const check =
    (watchEditFullName === fullName || watchEditFullName === undefined) &&
    (watchEditEmail === email || watchEditEmail === undefined) &&
    (watchEditAge === age || watchEditAge === undefined) &&
    (watchEditGender === gender || watchEditGender === undefined) &&
    (watchEditCity === city || watchEditCity === undefined) &&
    (watchEditPhoneNumber === phoneNumber ||
      watchEditPhoneNumber === undefined) &&
    (watchEditPostalCode === postalCode || watchEditPostalCode === undefined) &&
    (watchEditRegion === region || watchEditRegion === undefined);

  const formSubmitHandlerEdit = (data) => {
    dispatch(
      updateUser({
        email: data.email,
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        age: data.age,
        gender: data.gender,
        city: data.city,
        region: data.region,
        postalCode: data.postalCode,
        role,
        createdBy,
        assisstantId,
      })
    );
  };
  const handleEditCancel = async () => {
    setShowEditModal(false);
    resetEdit();
  };
  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <div className="flex justify-between">
          <Header category="Page" title="Assistants" />

          <button
            onClick={() => setShowModal(true)}
            type="button"
            className=" mb-10 mt-8 text-sm font-semibold text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            style={{ backgroundColor: currentColor, borderRadius: '10px' }}
          >
            <div className="flex  justify-center ">
              <FaPlus className=" mr-2 pt-1 " />
              Add Assistant
            </div>
          </button>

          {showModal ? (
            <>
              <div
                className=" m-2 md:m-10 mt-24 p-2 md:p-10  justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-md backdrop-brightness-150 md:backdrop-filter-none

"
              >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-50 outline-none focus:outline-none ">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                      <h3 className="text-lg font-semibold">
                        Invite new assistant
                      </h3>
                    </div>
                    <div className="relative p-6 flex-auto">
                      <form className=" px-8 pt-6 pb-8 w-full">
                        <label className="block text-black text-sm  mb-1">
                          FullName
                        </label>
                        <input
                          name="fullName"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          {...register('fullName')}
                        />
                        {errors.fullName ? (
                          <span className="text-red-900 text-sm">
                            {errors.fullName.message}
                          </span>
                        ) : (
                          <></>
                        )}
                        <label className="block text-black text-sm  mb-1 pt-1">
                          Email
                        </label>
                        <input
                          name="email"
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
                      </form>
                    </div>
                    <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        style={{
                          borderRadius: '10px',
                        }}
                        className="text-white  bg-red-500 active:bg-red-700 font-semibold  px-4 py-2 text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        onClick={handelCancel}
                      >
                        Close
                      </button>
                      <button
                        disabled={checkSubmitBtn}
                        style={{
                          borderRadius: '10px',
                          backgroundColor: !checkSubmitBtn
                            ? currentColor
                            : currentColor,
                          opacity: !checkSubmitBtn ? '' : 0.25,
                        }}
                        className="inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium
                        text-white shadow-sm"
                        type="submit"
                        onClick={handleSubmit(formSubmitHandler)}
                      >
                        Add assistant
                      </button>
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
                    <div className="relative p-6 flex-auto">
                      <form className=" px-8 pt-6 pb-8 w-full">
                        <div>
                          Are you sure you want to delete patient {nameTODelete}
                          ?
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

          {showEditModal ? (
            <>
              <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-50 outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-4 solid border-gray-50 rounded-t ">
                      <h3 className="text-lg font-semibold">Edit Assisstant</h3>
                    </div>
                    <div className="relative flex-auto">
                      <form onSubmit={handleSubmitEdit(formSubmitHandlerEdit)}>
                        <div className="overflow-hidden  sm:rounded-md">
                          <div className=" bg-gray-50 px-4 ">
                            <div className="grid grid-cols-6 gap-6">
                              <div className="col-span-6 sm:col-span-3">
                                <label
                                  htmlFor="first-name"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Full Name
                                </label>
                                <input
                                  type="text"
                                  name="fullName"
                                  id="fullName"
                                  autoComplete="fullName"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  defaultValue={fullName}
                                  {...registerEdit('fullName')}
                                />
                                {errorsEdit.fullName ? (
                                  <span className="text-red-900 text-sm">
                                    {errorsEdit.fullName.message}
                                  </span>
                                ) : (
                                  <></>
                                )}
                              </div>

                              {/* <div className="col-span-6 sm:col-span-3">
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
                          </div> */}

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
                                  {...registerEdit('email')}
                                />{' '}
                                {errorsEdit.email ? (
                                  <span className="text-red-900 text-sm">
                                    {errorsEdit.email.message}
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
                                  {...registerEdit('phoneNumber')}
                                />{' '}
                                {errorsEdit.phoneNumber ? (
                                  <span className="text-red-900 text-sm">
                                    {errorsEdit.phoneNumber.message}
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
                                  {...registerEdit('gender')}
                                >
                                  <option value="">Select</option>
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                </select>{' '}
                                {errorsEdit.gender ? (
                                  <span className="text-red-900 text-sm">
                                    {errorsEdit.gender.message}
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
                                  {...registerEdit('age')}
                                />{' '}
                                {errorsEdit.age ? (
                                  <span className="text-red-900 text-sm">
                                    {errorsEdit.age.message}
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
                                  {...registerEdit('city')}
                                />{' '}
                                {errorsEdit.city ? (
                                  <span className="text-red-900 text-sm">
                                    {errorsEdit.city.message}
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
                                  {...registerEdit('region')}
                                />{' '}
                                {errorsEdit.region ? (
                                  <span className="text-red-900 text-sm">
                                    {errorsEdit.region.message}
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
                                  {...registerEdit('postalCode')}
                                />{' '}
                                {errorsEdit.postalCode ? (
                                  <span className="text-red-900 text-sm">
                                    {errorsEdit.postalCode.message}
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
                              onClick={handleEditCancel}
                            >
                              Cancel
                            </button>

                            <button
                              disabled={check}
                              type="submit"
                              style={{
                                backgroundColor: !check
                                  ? currentColor
                                  : currentColor,
                                opacity: !check ? '' : 0.25,
                              }}
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

        {assistantsList && (
          <DataTable
            title="Assistants List"
            columns={columns}
            data={assistantsList}
            customStyles={customStyles}
            pagination
            selectableRows
            dense
            // expandableRows
          />
        )}
      </div>
    </>
  );
};
export default Assistants;
