import FormData from "form-data";
import { useState } from "react";
import axios from "axios";

const useUpload = () => {
  const [loading,setLoading] = useState<boolean>(false);

  const upload = async (uri:string) : Promise<string> => {
    setLoading(true);
    const filename = uri.split("/").pop();
    const match = /\.(\w+)$/.exec(filename ?? "");
    const type = match ? `image/${match[1]}` : `image`;
    const formData = new FormData();
    formData.append("files", { uri, name: filename, type });
    
    const res = await axios.post(
      "https://eb1f-175-202-245-36.ngrok-free.app/files/upload",
      formData,
      {
        headers : {
          "Content-Type":'multipart/form-data'
        }
      }
    );
    if(res){
      console.log(res.data[0]);
      setLoading(true);
    }
    return res.data[0];
  }
  return {
    upload,
    loading,
  }
}

export default useUpload