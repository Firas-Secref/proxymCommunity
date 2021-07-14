import {Developer} from "./Developer";

export class Publication {
  id!: number;
  text!: string;
  image1!: any;
  likesNb!:number;
  categorie!: string;
  developer!: Developer;


  constructor(text: string, categorie: string) {
    this.text = text;
    this.likesNb = 0;
    this.categorie = categorie;
  }
}
