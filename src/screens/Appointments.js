import React, { useEffect, useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import { FaPlus } from 'react-icons/fa';
import Header from '../components/Header';
import DataTable from 'react-data-table-component';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import {
  delAppointment,
  getAppointments,
  addNewAppointment,
  getPatientsByName,
  resetReducerAppointment,
} from '../reducers/appointmentSlice';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import { MdOutlineCancel } from 'react-icons/md';

import 'react-datepicker/dist/react-datepicker.css';
export default function Appointments() {
  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }
    return '';
  };
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [nameTODelete, setNameTODelete] = useState(false);
  const [patientId, setPatientId] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [visitDate, setVisitDate] = useState(new Date());
  const [visitTime, setVisitTime] = useState(new Date());
  const [dateChanged, setDateChanged] = useState(false);
  const [timeChanged, setTimeChanged] = useState(false);

  // const date = visitTime;
  // const showTime = date.getHours() + ':' + date.getMinutes();

  const formatAMPM = (visitTime) => {
    let hours = visitTime.getHours();
    let minutes = visitTime.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  };

  const [appointmentStatus, setAppointmentStatus] = useState('Reserve');
  const { currentColor } = useStateContext();
  const [showModal, setShowModal] = useState(false);
  const [showModalAppointment, setShowModalAppointment] = useState(false);
  const [patientName, setPatientName] = useState('');
  const {
    patientsListByName,
    appointmentList,
    messageAddNewAppointment,
    isSuccessAddNewAppointment,
    isErrorAddNewAppointment,
    messageDelAppointment,
    isSuccessDelAppointment,
    isErrorDelAppointment,
  } = useSelector((state) => state.appointment);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isErrorAddNewAppointment) {
      toast.error(messageAddNewAppointment);
      setShowModalAppointment(true);
    }

    if (isSuccessAddNewAppointment) {
      toast.success(messageAddNewAppointment);
      setShowModalAppointment(false);
    }
    if (messageAddNewAppointment) {
      dispatch(getAppointments());
    }
    dispatch(resetReducerAppointment());
  }, [
    isErrorAddNewAppointment,
    isSuccessAddNewAppointment,
    dispatch,
    messageAddNewAppointment,
  ]);

  const { user } = useSelector((state) => state.auth);
  const createdBy = user._id;

  useEffect(() => {
    dispatch(getPatientsByName());
  }, [dispatch]);

  const customStyles = {
    header: {
      style: {
        minHeight: '56px',
      },
    },
    headCells: {
      style: {
        fontSize: '14px',
      },
    },
    cells: {
      style: {
        width: '180px',
      },
    },
  };

  const columnsAppointment = [
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
      name: 'Visit date',
      selector: (row) => formatDate(row.visitDate),
    },
    {
      name: 'Visit time',
      selector: (row) => row.visitTime,
    },
    {
      name: 'Status',
      selector: (row) => row.appointmentStatus,
    },

    {
      name: 'Actions',
      cell: (row) => (
        <>
          <button
            // onClick={() => {
            //   setShowModal(true);
            //   handleEdit(row);
            // }}
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
  ];

  const handleRowSelected = (value) => {
    setSelectedRows(value.selectedRows[0]);
  };

  const handleCancel = async () => {
    setShowModal(false);
    dispatch(resetReducerAppointment());
  };

  const handelCancelAppointment = async () => {
    setShowModalAppointment(false);
    dispatch(resetReducerAppointment());
    setDateChanged(false);
    setTimeChanged(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(getPatientsByName({ patientName }));
    setPatientName('');
  };
  const time = formatAMPM(visitTime);

  const handleSubmitAppointment = async (e) => {
    e.preventDefault();
    dispatch(
      addNewAppointment({
        email: selectedRows.email,
        firstName: selectedRows.firstName,
        lastName: selectedRows.lastName,
        phoneNumber: selectedRows.phoneNumber,
        age: selectedRows.age,
        gender: selectedRows.gender,
        city: selectedRows.city,
        postalCode: selectedRows.postalCode,
        region: selectedRows.region,
        isPatient: selectedRows.isPatient,
        patientCreatedBy: selectedRows.createdBy,
        patientId: selectedRows._id,
        createdBy,
        appointmentStatus,
        visitDate,
        visitTime: time,
      })
    );
  };

  useEffect(() => {
    dispatch(getAppointments());
  }, [dispatch]);

  const handleShowModalAppointment = async (e) => {
    e.preventDefault();
    setShowModalAppointment(true);
    setShowModal(false);
  };

  const handleDate = async (date) => {
    setVisitDate(date);
    setDateChanged(true);
  };

  const handleTime = async (date) => {
    setVisitTime(date);
    setTimeChanged(true);
  };

  const handleDeleteCancel = async () => {
    setShowDeleteModal(false);
  };

  const handleDelete = () => {
    dispatch(delAppointment(patientId));
  };

  const handleDeleteInfo = async (row) => {
    setNameTODelete(row.firstName);
    setPatientId(row.patientId);
  };

  useEffect(() => {
    if (isErrorDelAppointment) {
      toast.error(messageDelAppointment);
      setShowDeleteModal(true);
    }

    if (isSuccessDelAppointment) {
      toast.success(messageDelAppointment);
      setShowDeleteModal(false);
    }
    if (messageDelAppointment) {
      dispatch(getAppointments());
    }
    dispatch(resetReducerAppointment());
  }, [
    isErrorDelAppointment,
    isSuccessDelAppointment,
    dispatch,
    messageDelAppointment,
  ]);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <div className="flex flex-wrap justify-between">
        <Header category="Page" title="Appointments" />
        <button
          onClick={() => setShowModal(true)}
          type="button"
          className=" mb-10 mt-8 text-sm font-semibold text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
          style={{ backgroundColor: currentColor, borderRadius: '10px' }}
        >
          <div className="flex  justify-center ">
            <FaPlus className=" mr-2 pt-1 " />
            Add Appointment
          </div>
        </button>
      </div>
      {showModal ? (
        <>
          {' '}
          <div className=" m-2 md:m-10 mt-24 p-2 md:p-10  justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-50 outline-none focus:outline-none ">
                <div className="flex items-start justify-between p-5  border-solid border-gray-300 rounded-t ">
                  <h3 className="text-lg font-semibold">Add new appointment</h3>
                </div>

                <form className=" px-4 pt-6 pb-8 w-full">
                  <div className="grid grid-cols-4 gap-2">
                    <div className="col-span-6 sm:col-span-2">
                      <div className="flex items-center">
                        <div className="flex space-x-1 mb-6">
                          <input
                            style={{ borderColor: currentColor }}
                            type="text"
                            className="block w-full px-4 py-2 bg-white border rounded-full focus:outline-none "
                            placeholder="Search patient name"
                            onChange={(e) => setPatientName(e.target.value)}
                          />
                          <button
                            onClick={handleSubmit}
                            style={{ backgroundColor: currentColor }}
                            className="px-4 text-white  rounded-full "
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 h-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>{' '}
                  {patientsListByName && (
                    <DataTable
                      title="Patient List"
                      columns={columns}
                      data={patientsListByName}
                      customStyles={customStyles}
                      pagination
                      selectableRows
                      dense
                      onSelectedRowsChange={handleRowSelected}
                    />
                  )}{' '}
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
                      disabled={!selectedRows && !patientsListByName}
                      onClick={handleShowModalAppointment}
                      type="button"
                      style={{
                        borderRadius: '10px',
                        backgroundColor:
                          selectedRows && patientsListByName
                            ? currentColor
                            : currentColor,
                        opacity: selectedRows && patientsListByName ? '' : 0.25,
                      }}
                      className=" mb-10 mt-8 text-sm font-semibold text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                    >
                      <div className="flex  justify-center ">
                        <FaPlus className=" mr-2 pt-1 " />
                        Add Appointment
                      </div>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : null}
      {appointmentList && (
        <DataTable
          title="Appointment List"
          columns={columnsAppointment}
          data={appointmentList}
          customStyles={customStyles}
          pagination
          selectableRows
          dense
        />
      )}

      {showModalAppointment ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-lg font-semibold">
                    Select time and date
                  </h3>
                </div>
                <div className="relative p-6 flex-auto">
                  <form className=" px-8 pt-6 pb-8 w-full">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-8">
                        <DatePicker
                          onChange={(date) => handleDate(date)}
                          inline
                          selected={visitDate}
                          name="startDate"
                          dateFormat="MM/dd/yyyy"
                        />

                        <DatePicker
                          inline
                          selected={visitTime}
                          onChange={(date) => handleTime(date)}
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={1}
                          timeCaption="Time"
                          dateFormat="h:mm aa"
                        />
                      </div>
                    </div>
                  </form>
                </div>
                <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    style={{
                      borderRadius: '10px',
                    }}
                    className="text-white  bg-red-500 active:bg-red-700 font-semibold  px-4 py-2 text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={handelCancelAppointment}
                  >
                    Close
                  </button>
                  <button
                    onClick={handleSubmitAppointment}
                    disabled={!timeChanged}
                    style={{
                      borderRadius: '10px',
                      backgroundColor: timeChanged
                        ? currentColor
                        : currentColor,
                      opacity: timeChanged ? '' : 0.25,
                    }}
                    className="inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium
                        text-white shadow-sm"
                    type="submit"
                  >
                    Save
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
                      Are you sure you want to delete appointment for patient{' '}
                      {nameTODelete}?
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
    </div>
  );
}
