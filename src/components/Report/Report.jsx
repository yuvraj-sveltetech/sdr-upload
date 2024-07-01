import React, { useEffect, useState } from "react";
import useApiHandle from "../../utils/useApiHandler";
import * as URL from "../../utils/ConstantUrl";
import ReportTableRow from "./ReportTableRow";

const Report = () => {
  const { data, apiCall, status_code } = useApiHandle();
  const [report, setReport] = useState([]);

  useEffect(() => {
    if (status_code === 200 && data?.data?.length > 0) {
      setReport([...data?.data]);
    }
  }, [status_code, data]);

  useEffect(() => {
    getReportList();
  }, []);

  const getReportList = () => {
    apiCall("get", `${URL.REPORT_LIST}`, {});
  };

  const indicator = (type) => {
    switch (type) {
      case "Completed":
        return "#34c759";

      case "Pending":
        return "#f7dc6f";

      case "Failed":
        return "#ef4444";

      default:
        return "#a8a8a8";
    }
  };

  return (
    <>
      {report?.length === 0 ? (
        <h2 className="flex justify-center items-center h-full text-gray-400 text-2xl font-medium">
          No Data Found!
        </h2>
      ) : (
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
                    Table Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {report?.map((list, i) => (
                  <tr
                    key={`ReportList${list.id}`}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <ReportTableRow
                      list={list}
                      i={i}
                      indicator={indicator(list?.process_status)}
                      getReportList={getReportList}
                    />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Report;
