export class Friends {
  id!: number;
  follower_Id!: number;
  followed_Id!: number;


  constructor(follower: number, followed: number) {
    this.follower_Id = follower;
    this.followed_Id = followed;
  }
}
