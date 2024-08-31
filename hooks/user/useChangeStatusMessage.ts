import { useState } from "react";
import instance from "../../libs/axios/instance";

const useChangeStatusMessage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>("");

  const handleStatusMessage = (e: string) => {
    setStatusMessage(e);
  };

  const submit = async () => {
    setLoading(true);
    const res = await instance.patch("/users/me", {
      statusMessage,
    });
    if (res) {
      setStatusMessage("");
      setLoading(false);
    }
    return res.data.data;
  };

  return {
    loading,
    statusMessage,
    handleStatusMessage,
    submit,
  };
};

export default useChangeStatusMessage;
