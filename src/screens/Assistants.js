import React, { useState, useEffect } from 'react';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
} from '@syncfusion/ej2-react-grids';

import { customersData, customersGrid } from '../data/dummy';
import Header from '../components/Header';
import { useStateContext } from '../contexts/ContextProvider';
import { FaPlus } from 'react-icons/fa';
import { MdOutlineCancel } from 'react-icons/md';
import { addUsers } from '../reducers/assistantSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { inviteSchema } from '../schema/formSchema';

const Assistants = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete'];
  const editing = { allowDeleting: true, allowEditing: true };
  const { currentColor } = useStateContext();
  const [showModal, setShowModal] = useState(false);
  const [role, setRole] = useState('Assistant');
  const { user } = useSelector((state) => state.auth);
  const createdBy = user._id;
  const { message } = useSelector((state) => state.assistant);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
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

  useEffect(() => {
    if (message === 'Invitation send successfully') {
      setShowModal(false);
      reset();
    }
  }, [message, reset, setShowModal]);

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
              <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                      <h3 className="text-lg font-semibold">
                        Invite new assistant
                      </h3>

                      <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        style={{ color: currentColor }}
                        className="text-xl rounded-full pt-1 hover:bg-light-gray  block "
                      >
                        <MdOutlineCancel />
                      </button>
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
                        className="text-white  bg-red-500 active:bg-red-700 font-semibold  px-4 py-2 text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        style={{ backgroundColor: currentColor }}
                        className="text-white font-semibold  text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
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
        </div>
        <GridComponent
          dataSource={customersData}
          enableHover={false}
          allowPaging
          pageSettings={{ pageCount: 5 }}
          selectionSettings={selectionsettings}
          toolbar={toolbarOptions}
          editSettings={editing}
          allowSorting
        >
          <ColumnsDirective>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            {customersGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
        </GridComponent>
      </div>
    </>
  );
};
export default Assistants;
