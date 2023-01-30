import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateStatusModal from "../../../components/UpdateStatusModal";

const Index = () => {
  const [students, setStudents] = useState([]);
  const [dialog, setDialog] = useState(false);
  const [id, setId] = useState("");
  const [status, setStatus] = useState("");
  useEffect(() => {
    const getUsers = async () => {
      try {
        let token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const res = await axios.get(
          "http://localhost:4000/api/v1/projectassigns",
          config
        );
        setStudents(res.data.data.projectAssignment.supervisee);
      } catch (error) {}
    };
    getUsers();
  }, [students]);

  const closePopup = () => {
    setDialog(false);
  };

  const openDialog = (id, status) => {
    setId(id);
    setStatus(status);
    setDialog(true);
  };
  return (
    <>
      <section className="p-4">
        <div>
          <h1 className="text-center mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-4xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              Supervisor
            </span>{" "}
            Dashboard
          </h1>
        </div>
        <hr />
        <div className="pt-4">
          <h3 className="flex items-center text-xl font-extrabold dark:text-white">
            No Of Supervisees:
            <span className="bg-blue-100 text-blue-800 text-xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-2">
              {students.length}
            </span>
          </h3>
        </div>
        {students.length > 0 ? (
          <>
            {students.map((el, j) => (
              <div key={j} className="flex flex-col pt-12">
                <div>
                  {/* Name: {el.fullName} */}
                  <h1 className="">
                    <span className="px-2 text-gray-600">Name</span>{" "}
                    <span className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                      : &nbsp;{el.fullName}
                    </span>
                  </h1>
                </div>
                <div>
                  {/* Name: {el.fullName} */}
                  <h1 className="">
                    <span className="px-2 text-gray-600">Reg NO</span>{" "}
                    <span className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                      : &nbsp;{el.regNO}
                    </span>
                  </h1>
                </div>
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      <table className="min-w-full border text-center">
                        <thead className="border-b text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th
                              scope="col"
                              className="text-sm font-medium text-gray-900 px-6 py-2 border-r"
                            >
                              #
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium text-gray-900 px-6 py-2 border-r"
                            >
                              Topic
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium text-gray-900 px-6 py-2 border-r"
                            >
                              Status
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium text-gray-900 px-6 py-2 border-r"
                            >
                              File
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {el.projects.map((pro, i) => (
                            <tr
                              key={i}
                              className="border-b border-gray-200 dark:border-gray-700"
                            >
                              <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                                {i + 1}
                              </td>
                              <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                                {pro.title}
                              </td>
                              <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                                {pro.status}
                                &nbsp; &nbsp;
                                {pro.status === "pending" ? (
                                  <>
                                    <button
                                      className="text-red-600"
                                      onClick={() =>
                                        openDialog(pro._id, "declined")
                                      }
                                    >
                                      <i className="fa fa-times"></i>
                                    </button>
                                    &nbsp; &nbsp;
                                    <button
                                      className="text-green-600"
                                      onClick={() =>
                                        openDialog(pro._id, "approved")
                                      }
                                    >
                                      <i className="fa fa-check"></i>
                                    </button>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </td>
                              {pro.projectFile ? (
                                <>
                                  <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                                    <a
                                      className="bg-gray-400 px-4 text-white py-2 rounded-sm"
                                      target="_blank"
                                      href={`http://localhost:4000/${pro.projectFile}`}
                                      rel="noreferrer"
                                    >
                                      View
                                    </a>
                                  </td>
                                </>
                              ) : (
                                <>
                                  <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                                    -
                                  </td>
                                </>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>No Students Assigned so far!</>
        )}
      </section>
      <UpdateStatusModal
        dialog={dialog}
        closeModal={closePopup}
        status={status}
        id={id}
      ></UpdateStatusModal>
    </>
  );
};

export default Index;
