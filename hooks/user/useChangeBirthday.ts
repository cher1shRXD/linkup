import { useState } from "react"
import instance from "../../libs/axios/instance";

const useChangeBirthday = () => {
  const [newBirthday, setNewBirthday] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);


  const handleBirthday = (date:string) => {
    setNewBirthday(date);
  }

  const submit = async () => {
    if(!newBirthday){
      return;
    }
    setLoading(true);
    const res = await instance.patch("/me", {
      birthday:newBirthday,
    });
    if (res) {
      setLoading(false);
    }
    return res.data.data;
  }

  return {
    newBirthday,
    handleBirthday,
    submit,
    loading
  }
}

export default useChangeBirthday