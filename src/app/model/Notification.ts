
export class Notification {
  id!: number;
  from_userId!: number;
  from_firstname!: string;
  from_lastname!:string;
  from_username!: string;
  to_firstname!: string;
  to_lastname!: string;
  to_username!: string
  to_userId!: number;
  to_userImage!: string;
  action!: string;


  constructor(from_userId: number, from_firstname: string, from_lastname: string, from_username: string, to_firstname: string, to_lastname: string, to_username: string, to_userId: number, to_userImage: string, action: string) {
    this.from_userId = from_userId;
    this.from_firstname = from_firstname;
    this.from_lastname = from_lastname;
    this.from_username = from_username;
    this.to_firstname = to_firstname;
    this.to_lastname = to_lastname;
    this.to_username = to_username;
    this.to_userId = to_userId;
    this.to_userImage = to_userImage;
    this.action = action;
  }

}
