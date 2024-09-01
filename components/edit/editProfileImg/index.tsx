import { Alert, Platform, Text } from "react-native";
import * as S from "./style";
import { ThemedText } from "../../theme";
import Skeleton from "../../skeleton";
import useGetMe from "../../../hooks/user/useGetMe";
import { useTheme } from "../../../context/theme/themeContext";
import useUpload from "../../../hooks/upload/useUpload";
import useChangeImg from "../../../hooks/user/useChangeImg";
import useDeleteImg from "../../../hooks/user/useDeleteImg";
import * as ImagePicker from "expo-image-picker";
import { User } from "../../../types/auth/user.type";
import { useEffect } from "react";

const EditProfileImg = ({ user }: { user: User }) => {
  const { theme } = useTheme();
  const { ...me } = useGetMe();
  const { ...upload } = useUpload();
  const { ...changeImg } = useChangeImg();
  const { ...deleteImg } = useDeleteImg();

  const requestPermission = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("권한이 필요합니다!");
      }
    }
  };

  const pickImage = async () => {
    requestPermission();
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (result.canceled) {
      return;
    }
    try {
      const globalUrl = await upload.upload(result.assets[0].uri);
      if (globalUrl) {
        const res = await changeImg.changeImg(globalUrl);
        if (res) {
          me.getMe();
        }
      }
    } catch {
      Alert.alert("네트워크 에러", "나중에 다시 시도해주세요");
    }
  };

  const deleteProfileImg = async () => {
    try {
      const res = await deleteImg.deleteImg();
      if (res) {
        me.getMe();
      }
    } catch {
      Alert.alert("네트워크 에러", "나중에 다시 시도해주세요");
    }
  };

  return (
    <S.Container>
      {me.loading ? (
        <Skeleton width={100} height={100} style={{ borderRadius: 10 }} />
      ) : (
        <S.ProfileImg src={user.profileImage} />
      )}
      <S.ProfileImgBtnWrap>
        <S.ProfileImgBtn
          style={{ backgroundColor: "#1e90ff" }}
          onPress={pickImage}
        >
          <Text style={{ color: "white" }}>변경하기</Text>
        </S.ProfileImgBtn>
        <S.ProfileImgBtn
          style={{ backgroundColor: theme.boxColor }}
          onPress={deleteProfileImg}
        >
          <ThemedText>삭제</ThemedText>
        </S.ProfileImgBtn>
      </S.ProfileImgBtnWrap>
    </S.Container>
  );
};

export default EditProfileImg;
