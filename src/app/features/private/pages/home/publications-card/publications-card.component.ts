import {Component, DoCheck, Input, OnChanges, OnInit} from '@angular/core';
import {Likes} from "../../../../../model/Likes";
import {PubService} from "../../../services/pub.service";
import {Developer} from "../../../../../model/Developer";
import {Publication} from "../../../../../model/Publication";

@Component({
  selector: 'app-publications-card',
  templateUrl: './publications-card.component.html',
  styleUrls: ['./publications-card.component.scss']
})
export class PublicationsCardComponent implements OnInit, OnChanges {

  @Input() postsInput !: any;
  @Input() userInput!: Developer;
  constructor(private postService: PubService) { }

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    console.log(this.postsInput);
    console.log(this.userInput);
  }

  updateLikes(id: number, i: number) {
    this.postsInput[i].ilikeIt = true;
    this.postsInput[i].likesNb ++;
    let newLike = new Likes(this.userInput.id, id);
    console.log(newLike)
    this.postService.addLikes(newLike).subscribe((data: any)=>{
      console.log("like added");
    })
  }

  deleteLike(postId: number, i: number){
    this.postsInput[i].ilikeIt = false;
    this.postsInput[i].likesNb --;
    this.postService.deleteLike(this.userInput.id, postId).subscribe((data: any)=>{
      console.log("like removed")
    })
  }

  // getPostLikesNb(id: number){
  //   this.postService.getLikeNb(id).subscribe((data: number)=>{
  //     this.postsInput.likesNb = data;
  //   });
  // }

}
