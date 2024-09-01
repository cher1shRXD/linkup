import { useState } from "react";
import instance from "../../libs/axios/instance";
import { Alert } from "react-native";

const useChangeLinkupId = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [linkupId, setLinkupId] = useState<string>("");

  const handleLinkupId = (e: string) => {
    setLinkupId(e);
  };

  const submit = async () => {
    const REGEX = /^[a-z0-9_]+$/;
    if (!REGEX.test(linkupId)) {
      Alert.alert(
        "형식 에러",
        "링크업 아이디는 숫자, 영문 소문자, '_'만 사용할 수 있습니다"
      );
      setLoading(false);
      return;
    }
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
