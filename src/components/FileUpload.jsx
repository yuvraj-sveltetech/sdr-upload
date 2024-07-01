import { MdOutlineDelete } from "react-icons/md";
import React, { useState, useCallback, useEffect } from "react";
import fileImg from "../assets/images/file.png";
import useApiHandle from "../utils/useApiHandler";
import * as URL from "../utils/ConstantUrl";
import Modal from "../utils/Modal";
import { toast } from "react-toastify";
import Loader from "../utils/Loader";

const FileUpload = () => {
  const { data, apiCall, status_code } = useApiHandle();
  const [operator, setOperator] = useState("AIRTEL");
  const [files, setFiles] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (status_code === 201 && data?.length > 0) {
      setIsOpen(false);
      setFiles([]);
      toast.success("Files Uploaded!");
    } else {
      setFiles([]);
      setIsOpen(false);
    }
  }, [status_code, data]);

  const handleFileSelect = useCallback((event) => {
    const newFiles = event.target.files;
    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const handleDelete = (fileName) => {
    const filteredFiles = files?.filter((file) => file?.name !== fileName);
    setFiles([...filteredFiles]);
  };

  const sendFiles = () => {
    if (files.length === 0) {
      toast.warn("Please Upload Files!");
      return;
    }

    setIsOpen(true);

    const formData = new FormData();

    files?.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("operator", operator);

    apiCall("post", `${URL.UPLOAD}`, formData);
  };

  function formatFileSize(bytes) {
    if (bytes < 1) return "0 Bytes";
    const units = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const index = Math.min(
      Math.floor(Math.log(bytes) / Math.log(1024)),
      units.length - 1
    );
    const size = Number((bytes / Math.pow(1024, index)).toFixed(2));
    return `${size} ${units[index]}`;
  }

  const modalBody = () => {
    return (
      <>
        <Loader />
        <p className="!mt-1 text-center text-black">
          Uploading... Please Wait...
        </p>
      </>
    );
  };

  return (
    <>
      <div className="flex flex-col items-center space-y-4 mt-5">
        <label
          className="flex items-center justify-center border border-dashed border-gray-400 h-32 w-full"
          htmlFor="file-upload"
        >
          <div className="flex flex-col items-center justify-center">
            <span className="font-normal">
              Drag and drop your files anywhere or
            </span>
            <label className="mt-3 px-2 py-1 bg-gray-300" htmlFor="file-upload">
              Upload a File
            </label>
            <input
              type="file"
              id="file-upload"
              multiple
              accept=".xls,.xlsx,.xlsb,.csv,.mdb,.accdb,.txt"
              className="hidden"
              onChange={(e) => handleFileSelect(e)}
            />
          </div>
        </label>

        <div className="w-full py-3 flex flex-col">
          <div className="flex justify-between items-center">
            <h3 className="text-lg pb-5">To Upload</h3>

            <div>
              <select
                name="operator"
                onChange={(e) => setOperator(e.target.value)}
              >
                <option value="AIRTEL">Airtel</option>
                <option value="JIO">Jio</option>
                <option value="VI">VI</option>
                <option value="BSNL">BSNL</option>
              </select>

              <button
                type="button"
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 ms-3 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                onClick={sendFiles}
              >
                Upload
              </button>
            </div>
          </div>
          <div
            className="pt-3 flex flex-wrap gap-3 list-none"
            style={{ height: "50vh", overflowY: "scroll" }}
          >
            {files?.length > 0 ? (
              files?.map((file, i) => (
                <div
                  className="p-2 bg-gray-100 rounded-lg flex flex-col justify-between"
                  key={`files${file?.name + i}`}
                  style={{ width: "23%", height: "19vh" }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="truncate"
                      style={{
                        width: "75%",
                      }}
                    >
                      {file?.name}
                    </span>

                    <MdOutlineDelete
                      style={{
                        fontSize: "18px",
                        cursor: "pointer",
                        color: "red",
                      }}
                      onClick={() => handleDelete(file?.name)}
                    />
                  </div>

                  <img src={fileImg} alt="file" className="w-16 h-16 mx-auto" />

                  <span className="text-gray-500 text-xs">
                    {formatFileSize(file?.size)}
                  </span>
                </div>
              ))
            ) : (
              <div className="h-full w-full flex flex-col items-center justify-center">
                <img
                  className="mx-auto w-32"
                  src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                  alt="no data"
                />
                <span className="text-gray-500">No files selected</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        toggleModal={toggleModal}
        isOpen={isOpen}
        body={modalBody}
        heading={"File Upload"}
        hideClose={true}
      />
    </>
  );
};

export default FileUpload;
