import React from "react";
import { useState, Fragment, useRef, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { UserContext } from "../context/UserState";

const Index = ({ dialog, closeModal, students, sup }) => {
  let [isOpen, setIsOpen] = useState(false);
  let [setNew, setStudents] = useState([]);
  let completeButtonRef = useRef(null);

  const { assignStudents } = useContext(UserContext);

  const test = (val) => {
    console.log(setNew.includes(val));
    let x = [...setNew, val];
    if (setNew.includes(val)) {
      x = setNew.filter((e) => e !== val);
      console.log(x, "x");
    }
    setStudents(x);
    console.log(setNew);
  };

  const submitAssignment = async () => {
    try {
      setStudents([...new Set(setNew)]);
      console.log(sup);
      console.log(setNew);
      await assignStudents({ data: { supervisee: setNew }, id: sup });
    } catch (error) {}
  };

  return (
    <>
      <Transition appear show={dialog} as={Fragment}>
        <Dialog
          open={dialog}
          onClose={() => setIsOpen(false)}
          initialFocus={completeButtonRef}
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full min-w-fit items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="mx-auto rounded bg-white max-w-3xl">
                  <Dialog.Title
                    ref={completeButtonRef}
                    className="text-2xl leading-relaxed text-gray-600 justify-between p-5 border-b border-solid border-slate-200 rounded-t"
                  >
                    Assign Students
                  </Dialog.Title>

                  <div className="p-4">
                    <h3 className="mb-4 font-semibold text-gray-900 dark:text-white text-center">
                      Students
                    </h3>
                    <ul className="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      {students.map((el, i) => (
                        <li
                          key={i}
                          className="w-full py-3 px-2 rounded-t-lg border-b border-gray-200 dark:border-gray-600 cursor-pointer"
                          onClick={() => test(el.id)}
                        >
                          {setNew.includes(el.id) ? (
                            <span className="text-green-600">
                              <i className="fa fa-check"></i>
                            </span>
                          ) : (
                            <></>
                          )}
                          {el.fullName}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-center rounded-b">
                    <button
                      onClick={() => submitAssignment()}
                      className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none ease-linear transition-all duration-150"
                    >
                      Submit
                    </button>
                  </div>

                  <div className="flex items-center justify-end border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => closeModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Index;
