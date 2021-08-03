import {Publication} from "./Publication";
import {Developer} from "./Developer";

export class Likes {
  id!: number;
  liker_Id!: number;
  post_Id!: number;


  constructor(liker_Id: number, post_Id: number) {
    this.liker_Id = liker_Id;
    this.post_Id = post_Id;
  }
}
