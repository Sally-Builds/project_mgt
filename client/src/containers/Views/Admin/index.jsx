import React, { useState, useEffect } from "react";
import axios from "axios";
import AssignModal from "../../../components/AssignModal";

const Index = () => {
  const [students, setStudents] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [sup, setSup] = useState("");
  const [dialog, setDialog] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        let token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const res = await axios.get(
          "http://localhost:4000/api/v1/users/allsups",
          config
        );

        const res2 = await axios.get(
          "http://localhost:4000/api/v1/users/unassigned",
          config
        );
        setLecturers(res.data.data);
        setStudents(res2.data.data);
      } catch (error) {}
    };
    getUsers();
  }, []);

  const closePopup = () => {
    setDialog(false);
  };

  const getSup = (supId) => {
    setSup(supId);
    setDialog(true);
  };
  return (
    <>
      <section className="p-4">
        <div className="text-3xl p-5 text-center">Admin Panel</div>
        <div className="flex flex-col">
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
                        Supervisors
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-2 border-r"
                      >
                        Number of supervisee
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-2 border-r"
                      >
                        Assign
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {lecturers.map((el, i) => (
                      <tr
                        key={i}
                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                      >
                        <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                          {i + 1}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                          {el.name}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                          {el.numOfSup}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                          <button
                            className="bg-gray-400 px-4 text-white py-2 rounded-sm"
                            onClick={() => getSup(el.id)}
                          >
                            Add
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      <AssignModal
        dialog={dialog}
        closeModal={closePopup}
        students={students}
        sup={sup}
      ></AssignModal>
    </>
  );
};

export default Index;
