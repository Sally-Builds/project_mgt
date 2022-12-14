import React from "react";
import { useState, Fragment, useRef, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { UserContext } from "../context/UserState";

const Index = ({ uploadDialog, closeUploadModal, id }) => {
  const { upload } = useContext(UserContext);
  let [isOpen, setIsOpen] = useState(false);
  let completeButtonRef = useRef(null);

  const [projectFile, setProjectFile] = useState(null);

  const create = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("projectFile", projectFile);
      await upload({ data: formData, id });
      closeUploadModal(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Transition appear show={uploadDialog} as={Fragment}>
        <Dialog
          open={uploadDialog}
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
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          htmlFor="file_input"
                        >
                          Upload file
                        </label>
                        <input
                          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                          id="file_input"
                          type="file"
                          onChange={(e) => setProjectFile(e.target.files[0])}
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
                      onClick={() => closeUploadModal(false)}
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
