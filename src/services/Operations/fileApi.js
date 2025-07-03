import toast from "react-hot-toast";
import { filepoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { setLoading, setFiles, addFile } from "../../slices/fileSlice"; 

const {
    UPLOAD_FILE,
    GET_USER_FILES
} = filepoints;

export function fileUpload(data, token) {
  return async (dispatch) => {
    const toastId = toast.loading("Uploading file...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", UPLOAD_FILE, data, {
        Authorization: `Bearer ${token}`,
      });

      console.log("Upload API RESPONSE............", response);

      if (!response?.data?.success) {
        throw new Error("Could Not Upload File");
      }

      toast.success("File Uploaded Successfully");

      response.data.data.file.shortUrl = response.data.data.shortUrl;
      console.log("final file data", response.data.data.file);

      dispatch(addFile(response.data.data.file));

    } catch (error) {
      console.log("UPLOAD FILE ERROR............", error);
      toast.error(error.message || "File upload failed");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function getAllFiles(token) {
  return async (dispatch) => {
    const toastId = toast.loading("Fetching file...");
    dispatch(setLoading(true));

    try {
        const response = await apiConnector("GET", GET_USER_FILES, null, {
            Authorization: `Bearer ${token}`,
        });

      console.log("GET FILES API RESPONSE............", response);

      if (!response?.data?.success) {
        throw new Error("Could Not Fetch File");
      }

      toast.success("File Fetched Successfully");

      dispatch(setFiles(response.data.data));

    } catch (error) {
      console.log("FETCHING FILE ERROR............", error);
      toast.error(error.message || "File Fetching failed");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

