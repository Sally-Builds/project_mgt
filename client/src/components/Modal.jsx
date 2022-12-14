import React from "react";
import { useState, Fragment, useRef, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { UserContext } from "../context/UserState";

const Index = ({ dialog, closeModal }) => {
  const { createProject } = useContext(UserContext);
  let [isOpen, setIsOpen] = useState(false);
  let completeButtonRef = useRef(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const create = async (e) => {
    try {
      e.preventDefault();
      await createProject({ title, description });
      closeModal(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Transition appear show={dialog} as={Fragment}>
        <Dialog
          open={dialog}
          onClose={() => setIsOpen(false)}
          className="relative z-50"
          initialFocus={completeButtonRef}
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
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
                    Add Project
                  </Dialog.Title>

                  <div className="p-4">
                    <form onSubmit={create}>
                      <div>
                        <label
                          htmlFor="password"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Project Topic
                        </label>
                        <input
                          type="text"
                          placeholder="Design and implementation of"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="password"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Project Description
                        </label>
                        <textarea
                          type="text"
                          rows={4}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Design and implementation of"
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        />
                      </div>

                      <div className="flex items-center justify-center rounded-b">
                        <button
                          className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none ease-linear transition-all duration-150"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
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
