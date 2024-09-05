import FormData from "form-data";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../constants";
import { ImagePickerAsset } from "expo-image-picker";

const useUpload = () => {
  const [loading,setLoading] = useState<boolean>(false);

  const upload = async (asset: ImagePickerAsset) => {
    setLoading(true);
    const { fileName, uri, type } = asset;
    const formData = new FormData();
    formData.append("files", { uri, name: fileName, type });
    console.log(formData);

    const res = await axios.post(`${API_URL}/files/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res) {
      setLoading(false);
      return res.data.data[0];
    }
  };
  return {
    upload,
    loading,
  }
}

export default useUpload