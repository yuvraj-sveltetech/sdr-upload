import { MdOutlineDelete } from "react-icons/md";
import React, { useState, useCallback, useEffect } from "react";
import fileImg from "../assets/images/file.png";
import useApiHandle from "../utils/useApiHandler";
import * as URL from "../utils/ConstantUrl";
import Modal from "../utils/Modal";
import { toast } from "react-toastify";
import axios from "axios";

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
      // setFiles([]);
      // setIsOpen(false);
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
        <div class="text-center">
          <div role="status">
            <svg
              aria-hidden="true"
              class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <p className="!mt-1">Processing...</p>
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
        heading={"File Uploading"}
      />
    </>
  );
};

export default FileUpload;
