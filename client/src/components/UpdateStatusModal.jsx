import React from "react";
import { useState, Fragment, useRef, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { UserContext } from "../context/UserState";

const Index = ({ dialog, closeModal, id, status }) => {
  const { updateStatus } = useContext(UserContext);
  let [isOpen, setIsOpen] = useState(false);
  let completeButtonRef = useRef(null);

  const create = async (e) => {
    try {
      e.preventDefault();
      await updateStatus({ data: { status }, id });
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
                    Confirm
                  </Dialog.Title>

                  <div className="p-4"></div>

                  {status === "approved" ? (
                    <div className="p-4">Approve This Project Topic?</div>
                  ) : (
                    <div className="p-4">Decline this Project Topic?</div>
                  )}

                  <div className="flex items-center justify-center rounded-b">
                    <form onSubmit={create}>
                      <button
                        className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Submit
                      </button>
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
