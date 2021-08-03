import {Developer} from "./Developer";

export class FolloweList {
  id!: number;
  follows!: Developer[];
  developer_Id!: number;

  constructor(follows: Developer[], developer_Id: number) {
    this.follows = follows;
    this.developer_Id = developer_Id;
  }
}
