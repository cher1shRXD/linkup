import { useState } from "react"
import instance from "../../libs/axios/instance";

const useChangeBirthday = () => {
  const [newBirthday, setNewBirthday] = useState<Date | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const formatDate = (date: Date | null) => {
    if (date) {
      let year = date.getFullYear();
      let month = (date.getMonth() + 1).toString().padStart(2, "0");
      let day = date.getDate().toString().padStart(2, "0");

      return `${year}-${month}-${day}`;
    }
  };

  const handleBirthday = (date:Date) => {
    setNewBirthday(date);
  }

  const submit = async () => {
    if(!newBirthday){
      return;
    }
    setLoading(true);
    const res = await instance.patch("/me", {
      birthday:formatDate(newBirthday),
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