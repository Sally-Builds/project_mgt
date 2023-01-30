import React, { useState, useEffect } from "react";
import axios from "axios";

const Index = () => {
  const [projects, setProject] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      let token = localStorage.getItem("token");
      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const res = await axios.get(
          "http://localhost:4000/api/v1/projects/allprojects",
          config
        );
        console.log(res.data.data.projects);
        setProject(res.data.data.projects);
      } catch (error) {
        console.log(error);
      }
    };
    getProjects();
  }, []);

  return (
    <section className="p-4">
      <div>
        <h1 className="text-center mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-3xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Futo Computer Science
          </span>{" "}
          Department Project Archive
        </h1>
      </div>
      <hr />
      <div className="pt-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
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
                    File
                  </th>
                </tr>
              </thead>
              <tbody>
                {projects.map((el, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-200 dark:border-gray-700"
                  >
                    <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                      {i + 1}
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                      {el.title}
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                      <a
                        className="bg-gray-400 px-4 text-white py-2 rounded-sm"
                        target="_blank"
                        href={`http://localhost:4000/${el.projectFile}`}
                        rel="noreferrer"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;
