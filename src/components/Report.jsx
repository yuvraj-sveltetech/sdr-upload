import { MdOutlineFileUpload } from "react-icons/md";
import React, { useEffect, useState } from "react";
import useApiHandle from "../utils/useApiHandler";
import * as URL from "../utils/ConstantUrl";

const Report = () => {
  const { data, apiCall, status_code } = useApiHandle();
  const [report, setReport] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [processId, setProcessId] = useState("");

  useEffect(() => {
    if (status_code === 200 && data?.data?.length > 0) {
      setReport([...data?.data]);
    }
    if (status_code === 200 && data?.message == "File already processed") {
      setIsLoading(false);
      setProcessId("");
    }
    if (status_code === 201) {
      setIsLoading(false);
      setProcessId("");
      apiCall("get", `${URL.REPORT_LIST}`, {});
    }
    if (status_code === undefined ||status_code === "" ) {
      setIsLoading(false);
      setProcessId("");
    }
  }, [status_code, data]);

  useEffect(() => {
    apiCall("get", `${URL.REPORT_LIST}`, {});
  }, []);

  const processFIle = (e, id) => {
    setIsLoading(true);
    setProcessId(id);
    apiCall("post", `${URL.PROCESS_FILE}${id}/`, {});
  };

  return (
    <div className="h-[100vh]">
      <div className="h-full relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                S. No.
              </th>
              <th scope="col" className="px-6 py-3">
                File name
              </th>
              <th scope="col" className="px-6 py-3">
                Operator
              </th>
              <th scope="col" className="px-6 py-3">
                Process Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {report?.map((list) => (
              <tr
                key={`reportList${list.id}`}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th className="px-6 py-4 text-gray-900">{list?.id}</th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {list?.name}
                </th>
                <td className="px-6 py-4">{list?.operator_name}</td>
                <td className="px-6 py-4">
                  <span className="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3">
                    {/* <span
                      className={`flex w-2.5 h-2.5 rounded-full me-1.5 flex-shrink-0 bg-yellow-600`}
                    ></span> */}
                    {list?.process_status ? "Completed" : "InComplete"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {isLoading && processId == list.id ? (
                    "Processing"
                  ) : (
                    <MdOutlineFileUpload
                      onClick={(e) => processFIle(e, list.id)}
                      size={20}
                      className=" hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
