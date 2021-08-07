import {Component, DoCheck, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Developer} from "../../../../model/Developer";
import {PubService} from "../../services/pub.service";
import {map, mergeMap} from "rxjs/operators";
import {Publication} from "../../../../model/Publication";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user !: Developer;
  posts !: any[];
  allUsers!: any[];
  postsNb!: number;
  friends!: number;
  likesNb: number = 0;
  myPosts!: Publication[];


  constructor(private service: UserService, private postService: PubService) { }

  ngOnInit(): void {
    this.service.getUserByUsername(localStorage.getItem("username")).pipe(
      mergeMap((data1: any)=>{
        this.user = data1;
        return this.postService.getMyFriendsPosts(this.user.id).pipe(
          mergeMap(data2 =>{
            this.posts = data2;
            console.log(data2);
            return this.service.getAllUsers(this.user.id).pipe(
              mergeMap(data3 =>{
                this.allUsers = data3;
                console.log("all",this.allUsers)
                return this.postService.getMyPosts(this.user.id).pipe(
                  mergeMap((dataa: any[]) =>{
                    this.postsNb = dataa.length;
                    this.myPosts = dataa;
                    this.myPosts.forEach(post=>{
                      this.likesNb += post.likesNb;
                    })
                    return this.service.getMyFollowsList(this.user.id).pipe(
                      map((data3: Developer[]) =>{
                        this.friends = data3.length
                        console.log("follows",data3)
                      })
                    )
                  })
                )
              })
            )
          })
        )
      })
    ).subscribe();
  }

  getNewFriend($event: number) {
    this.friends+=$event
  }

  getNewPost($event: any) {
    console.log("aaaaa",$event)
    this.posts.unshift($event);
    this.postsNb+=1;
  }

  addLike($event: number) {
    this.likesNb+=1;
  }

  removeLike($event: number) {
    this.likesNb-=1;
  }


}
