import {Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Likes} from "../../../../../model/Likes";
import {PubService} from "../../../services/pub.service";
import {Developer} from "../../../../../model/Developer";
import {Publication} from "../../../../../model/Publication";
import {InteractionService} from "../../../services/interaction.service";

@Component({
  selector: 'app-publications-card',
  templateUrl: './publications-card.component.html',
  styleUrls: ['./publications-card.component.scss']
})
export class PublicationsCardComponent implements OnInit, OnChanges {

  @Input() postsInput !: any[];
  @Input() userInput!: Developer;
  @Output() addNewLike = new EventEmitter<number>();
  @Output() removeLike = new EventEmitter<number>();

  constructor(private postService: PubService, private interaction: InteractionService) { }

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    console.log(this.postsInput);
    console.log(this.userInput);
  }

  updateLikes(id: number, i: number) {
    console.log(this.postsInput[i].id)
    if(this.postsInput[i].userId == this.userInput.id){
      this.addNewLike.emit(1);
    }
    this.postsInput[i].ilikeIt = true;
    this.postsInput[i].likesNb ++;
    let newLike = new Likes(this.userInput.id, id);
    console.log(newLike)
    this.postService.addLikes(newLike).subscribe((data: any)=>{
      console.log("like added");
    })
  }

  deleteLike(postId: number, i: number){
    if(this.postsInput[i].userId == this.userInput.id){
      this.removeLike.emit(1);
    }
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
