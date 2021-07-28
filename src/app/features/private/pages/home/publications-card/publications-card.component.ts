import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Likes} from "../../../../../model/Likes";
import {PubService} from "../../../services/pub.service";

@Component({
  selector: 'app-publications-card',
  templateUrl: './publications-card.component.html',
  styleUrls: ['./publications-card.component.scss']
})
export class PublicationsCardComponent implements OnInit, OnChanges {

  @Input() postsInput !: any;
  @Input() userInput!: any;
  constructor(private postService: PubService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    console.log(this.postsInput)
    console.log(this.userInput)
  }

  updateLikes(thisPost: any) {
    let newLike = new Likes(this.postsInput[0], this.userInput);
    this.postService.addLikes(this.postsInput[0]).subscribe((data: any)=>{
      console.log("like added");
    })
  }
}
