import { TouchableOpacity } from 'react-native';
import * as S from './style'
import { useEffect, useState } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import useChangeBirthday from '../../../hooks/user/useChangeBirthday';
import { User } from '../../../types/auth/user.type';
import useGetMe from '../../../hooks/user/useGetMe';

const EditBirthday = ({user}:{user:User}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const { ...me } = useGetMe();
  const { ...birthday } = useChangeBirthday();

  useEffect(()=>{
    birthday.handleBirthday(user.birthday);
  },[]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };


  const formatDate = (date: Date | null) => {
    if (date) {
      let year = date.getFullYear();
      let month = (date.getMonth() + 1).toString().padStart(2, "0");
      let day = date.getDate().toString().padStart(2, "0");

      return `${year}-${month}-${day}`;
    }
  };

  const handleConfirm = (selectedDate: Date) => {
    hideDatePicker();
    const date = formatDate(selectedDate);
    if(date){
      birthday.handleBirthday(date);
    }
  };

  const submit = async () => {
    const res = await birthday.submit();
    if (res) {
      me.getMe();
    }
  };

  

  return (
    <S.Container>
      <TouchableOpacity onPress={showDatePicker} style={{ width: "100%" }}>
        <S.BirthdayWrap>
          <S.BirthdayText>
            {birthday.newBirthday &&
              birthday.newBirthday.split("-")[0] + "년 "}
          </S.BirthdayText>
          <S.BirthdayText>
            {birthday.newBirthday &&
              birthday.newBirthday.split("-")[1] + "월 "}
          </S.BirthdayText>
          <S.BirthdayText>
            {birthday.newBirthday &&
              birthday.newBirthday.split("-")[2] + "일 "}
          </S.BirthdayText>
        </S.BirthdayWrap>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <S.Button
        isDisabled={birthday.newBirthday === user.birthday}
        onPress={submit}
        disabled={birthday.newBirthday === user.birthday}
      >
        <S.ButtonText
          isDisabled={birthday.newBirthday === user.birthday}
        >
          {birthday.loading ? "변경 중..." : "변경"}
        </S.ButtonText>
      </S.Button>
    </S.Container>
  );
}

export default EditBirthday