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
        // const users = res.data.users;
        setStudents(res.data.data.projectAssignment.supervisee);
        // setStudents(users.filter((e) => e.role === "student"));
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
        <div className="text-3xl p-5 text-center">Supervisor Panel</div>
        <div className="p-4">No Of Supervisees: {students.length}</div>
        {students.length > 0 ? (
          <>
            {students.map((el, j) => (
              <div key={j} className="flex flex-col pt-12">
                <div>Name: {el.fullName}</div>
                <div>Reg NO: {el.regNO}</div>
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
                              Topic
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            >
                              status
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            >
                              File
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {el.projects.map((pro, i) => (
                            <tr
                              key={i}
                              className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {i + 1}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {pro.title}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
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
                                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
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
                                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
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
