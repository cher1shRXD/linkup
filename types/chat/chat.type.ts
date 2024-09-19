export interface Chat {
  id:number;
  content:string;
  sender:{
    nickname:string;
    profileImage:string;
    linkupId:string;
  }
  createdAt:string;
}