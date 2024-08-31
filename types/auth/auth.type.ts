export interface LoginData {
  email:string;
  password:string;
}

export interface SignupData {
  email:string;
  password:string;
  realName:string;
  nickname:string;
  phoneNumber:string;
  birthday:Date | null;
  gender:string;
}