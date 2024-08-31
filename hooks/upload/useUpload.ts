import FormData from "form-data";
import instance from "../../libs/axios/instance";
import { useState } from "react";

const useUpload = () => {
  const [loading,setLoading] = useState<boolean>(false);

  const upload = async (uri:string) : Promise<string> => {
    setLoading(true);
    const filename = uri.split("/").pop();
    const match = /\.(\w+)$/.exec(filename ?? "");
    const type = match ? `image/${match[1]}` : `image`;
    const formData = new FormData();
    formData.append("file", { uri, name: filename, type });
    
    const res = await instance.post('/upload',formData,{headers:{"Content-Type":'multipart/form-data'}});
    if(res){
      setLoading(true);
    }
    return res.data.data.url;
  }
  return {
    upload,
    loading
  }
}

export default useUpload