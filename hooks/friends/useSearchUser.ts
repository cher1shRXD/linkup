import { useState } from "react";
import { User } from "../../types/auth/user.type";
import instance from "../../libs/axios/instance";

interface SearchResult {
  nickname: string;
  profileImage: string;
  linkupId: string;
  isFriend: boolean;
}

const useSearchUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<SearchResult>({
    nickname: "",
    isFriend: false,
    linkupId: "",
    profileImage: "",
  });
  const [searchText, setSearchText] = useState<string>("");
  const [isSearched, setIsSearched] = useState<boolean>(false);

  const handleSearchText = (e: string) => {
    setSearchText(e);
  };
  const searchUser = async () => {
    setIsSearched(true);
    setLoading(true);
    const res = await instance.get("/users", {
      params: { linkupId: searchText },
    });
    if (res && res.data.data.linkupId.length > 0) {
      setResult(res.data.data);
    } else {
      setResult({
        nickname: "",
        profileImage: "",
        linkupId: "",
        isFriend: false,
      });
    }
  };
  return {
    loading,
    result,
    searchUser,
    handleSearchText,
    searchText,
    isSearched,
  };
};

export default useSearchUser;
