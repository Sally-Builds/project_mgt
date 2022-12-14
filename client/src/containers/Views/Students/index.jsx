import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../../context/UserState";
import Modal from "../../../components/Modal";
import UploadModal from "../../../components/UploadModal";

const Index = () => {
  const { user } = useContext(UserContext);
  const [sup, setSup] = useState("");
  const [id, setId] = useState("");
  const [dialog, setDialog] = useState(false);
  const [uploadDialog, setUploadDialog] = useState(false);
  const { projects } = user;

  useEffect(() => {
    const getSupervisor = async () => {
      let token = localStorage.getItem("token");
      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const res = await axios.get(
          "http://localhost:4000/api/v1/users/sup",
          config
        );
        setSup(res.data.name);
      } catch (error) {
        console.log(error);
      }
    };
    getSupervisor();
  });

  const closePopup = () => {
    setDialog(false);
  };

  const closeUploadPopup = () => {
    setUploadDialog(false);
  };

  const openUploadDialog = (id) => {
    setId(id);
    setUploadDialog(true);
  };

  return (
    <>
      <section className="p-4">
        <div className="text-3xl p-5 text-center">Student Panel</div>
        {sup ? <div>Supervisor: {sup}</div> : <>Not Assigned</>}
        {user.projects ? (
          <div>
            Project Topics submitted: {user.projects.length || 0} &nbsp;{" "}
            <span className="italic">
              NB - You need to provide at least 3 project topics
            </span>
          </div>
        ) : (
          <></>
        )}
        {projects.length < 3 ? (
          <>
            <button
              className="bg-gray-400 px-4 text-white rounded-sm"
              onClick={() => setDialog(true)}
            >
              Add Project
            </button>
          </>
        ) : (
          <></>
        )}
        <>
          {user.projects.map((project, i) => (
            <div key={i} className="flex flex-col pt-8">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full">
                      <thead className="bg-white border-b">
                        <tr>
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            #
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            Project Topic
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            File upload
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {i + 1}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {project.title}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {project.status}
                          </td>
                          {project.projectFile ? (
                            <>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <a
                                  className="bg-gray-400 px-4 text-white py-2 rounded-sm"
                                  target="_blank"
                                  href={`http://localhost:4000/${project.projectFile}`}
                                  rel="noreferrer"
                                >
                                  View
                                </a>
                              </td>
                            </>
                          ) : (
                            <>
                              {project.status === "approved" ? (
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  <button
                                    className="bg-gray-400 px-4 text-white rounded-sm"
                                    onClick={() =>
                                      openUploadDialog(project._id)
                                    }
                                  >
                                    Upload File
                                  </button>
                                </td>
                              ) : (
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  {" "}
                                  -{" "}
                                </td>
                              )}
                            </>
                          )}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      </section>
      <Modal dialog={dialog} closeModal={closePopup}></Modal>
      <UploadModal
        uploadDialog={uploadDialog}
        closeUploadModal={closeUploadPopup}
        id={id}
      ></UploadModal>
    </>
  );
};

export default Index;
