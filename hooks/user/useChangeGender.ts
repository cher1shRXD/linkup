import { useState } from 'react'
import instance from '../../libs/axios/instance';

const useChangeGender = () => {
  const [loading,setLoading] = useState<boolean>(false);
  const [newGender, setNewGender] = useState<"MALE"|"FEMALE"|"OTHER">();

  const handleGender = (gender:"MALE"|"FEMALE"|"OTHER") => {
    setNewGender(gender);
  }

  const submit = async () => {
    setLoading(true);
    const res = await instance.patch("/users/me", {
      gender:newGender,
    });
    if (res) {
      setLoading(false);
    }
    return res.data.data;
  }

  return {
    loading,
    handleGender,
    newGender,
    submit
  }
}

export default useChangeGender