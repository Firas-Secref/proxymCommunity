import {Publication} from "./Publication";
import {Developer} from "./Developer";

export class Likes {
  id!: number;
  publicationLiked!: Publication;
  developerLike!: Developer;

  constructor(post: Publication, user: Developer) {
    this.publicationLiked = post;
    this.developerLike = user;
  }
}
