import { useState } from "react";
import instance from "../../libs/axios/instance";

const useChangeLinkupId = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [linkupId, setLinkupId] = useState<string>("");

  const handleLinkupId = (e: string) => {
    setLinkupId(e);
  };

  const submit = async () => {
    setLoading(true);
    const res = await instance.patch("/users/me", {
      linkupId,
    });
    if (res) {
      setLinkupId("");
      setLoading(false);
    }
    return res.data.data;
  };

  return {
    loading,
    linkupId,
    handleLinkupId,
    submit,
  };
};

export default useChangeLinkupId;
