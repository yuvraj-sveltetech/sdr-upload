import { MdOutlineFileUpload } from "react-icons/md";
import { IoOpenOutline } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import useApiHandle from "../../utils/useApiHandler";
import * as URL from "../../utils/ConstantUrl";
import Modal from "../../utils/Modal";
import Loader from "../../utils/Loader";

const ReportTableRow = ({ list, i, indicator, getReportList }) => {
  const { data, apiCall, status_code, loading } = useApiHandle();
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  const modalBody = () => {
    return (
      <>
        <Loader />
        <p className="!mt-1 text-center text-black">
          Processing... Please Wait...
        </p>
      </>
    );
  };

  useEffect(() => {
    if (loading) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }

    if (status_code === 201) {
      getReportList();
    }
  }, [status_code, data, loading]);

  const processFIle = (e, id) => {
    apiCall("post", `${URL.PROCESS_FILE}${id}/`, {});
  };

  console.log(indicator, "indicator");

  return (
    <>
      <th className="px-6 py-4 text-gray-900">{i + 1}</th>
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
          <span className="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3">
            <span
              className="flex w-2.5 h-2.5 rounded-full me-1.5 flex-shrink-0 mt-[2.5px]"
              style={{ backgroundColor: indicator }}
            ></span>
            {list?.process_status}
          </span>
        </span>
      </td>
      <td className="px-6 py-4 flex items-center">
        <MdOutlineFileUpload
          onClick={(e) =>
            list?.process_status !== "Completed" && processFIle(e, list?.id)
          }
          size={20}
          className={`mr-3 ${
            list?.process_status !== "Completed"
              ? "text-black hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              : "text-gray-300 cursor-auto hover:none"
          }`}
        />

        <IoOpenOutline
          className={`${
            list?.process_status !== "Completed"
              ? "text-black hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              : "text-gray-300"
          }`}
          size={17}
        />
      </td>

      <Modal
        toggleModal={toggleModal}
        isOpen={isOpen}
        body={modalBody}
        heading={"File Process"}
        hideClose={true}
      />
    </>
  );
};

export default ReportTableRow;
