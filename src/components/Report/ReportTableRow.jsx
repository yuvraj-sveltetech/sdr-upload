import { MdOutlineFileUpload } from "react-icons/md";
import { IoOpenOutline } from "react-icons/io5";
import React, { useEffect } from "react";
import useApiHandle from "../../utils/useApiHandler";
import * as URL from "../../utils/ConstantUrl";

const ReportTableRow = ({ list }) => {
  const { data, apiCall, status_code, loading } = useApiHandle();

  useEffect(() => {
    console.log(status_code, data, "strC");
  }, [status_code, data]);

  const processFIle = (e, id) => {
    apiCall("post", `${URL.PROCESS_FILE}${id}/`, {});
  };

  return (
    <>
      <th className="px-6 py-4 text-gray-900">{list?.id}</th>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {list?.name}
      </th>
      <td className="px-6 py-4">{list?.operator_name}</td>
      <td className="px-6 py-4">{list?.table_name?.map((item) => item)}</td>
      <td className="px-6 py-4">
        <span className="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3">
          {list?.process_status ? (
            <span class="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3">
              <span class="flex w-2.5 h-2.5 bg-green-500 rounded-full me-1.5 flex-shrink-0 mt-[2.5px]"></span>
              Completed
            </span>
          ) : (
            <span class="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3">
              <span class="flex w-2.5 h-2.5 bg-red-500 rounded-full me-1.5 flex-shrink-0 mt-[2.5px]"></span>
              Failed
            </span>
          )}
        </span>
      </td>
      <td className="px-6 py-4 flex items-center">
        <MdOutlineFileUpload
          onClick={(e) => !list?.process_status && processFIle(e, list?.id)}
          size={20}
          className={`  mr-3 ${
            !list?.process_status
              ? "text-black hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              : "text-gray-300 cursor-auto hover:none"
          }`}
        />

        <IoOpenOutline
          className={`  ${
            !list?.process_status
              ? "text-black hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              : "text-gray-300"
          }`}
          size={17}
        />
      </td>
    </>
  );
};

export default ReportTableRow;
