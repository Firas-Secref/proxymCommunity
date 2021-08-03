import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Developer} from "../../../../model/Developer";
import {map, mergeMap} from "rxjs/operators";
import {PubService} from "../../services/pub.service";
import {Router} from "@angular/router";
import {Likes} from "../../../../model/Likes";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user!: any;
  myPosts!: any[];
  friends!: Developer[]
  constructor(private service: UserService,private pubService: PubService, private router: Router) { }

  ngOnInit(): void {

    this.service.getUserByUsername(localStorage.getItem("username")).pipe(
      mergeMap((data1: any)=>{
        this.user = data1
        console.log(data1)
        return this.pubService.getMyPosts(this.user.id).pipe(
          mergeMap(data2 =>{
            this.myPosts = data2;
            console.log(this.myPosts)
            return this.service.getMyFollowsList(this.user.id).pipe(
              map((data3: Developer[]) =>{
                this.friends = data3
              })
            )
          })
        )
      })
    ).subscribe()

  }

  navigateToEdit() {
    this.router.navigateByUrl("home/edit");
  }

  updateLikes(id: number, i: number) {
    this.myPosts[i].ilikeIt = true;
    this.myPosts[i].likesNb ++;
    let newLike = new Likes(this.user.id, id);
    console.log(newLike)
    this.pubService.addLikes(newLike).subscribe((data: any)=>{
      console.log("like added");
    })
  }

  deleteLike(postId: number, i: number){
    this.myPosts[i].ilikeIt = false;
    this.myPosts[i].likesNb --;
    this.pubService.deleteLike(this.user.id, postId).subscribe((data: any)=>{
      console.log("like removed")
    })
  }
}
