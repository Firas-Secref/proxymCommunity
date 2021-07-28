import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Developer} from "../../../../model/Developer";
import {PubService} from "../../services/pub.service";
import {map, mergeMap} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user !: Developer;
  posts !: any;
  allUsers!: any[];


  constructor(private service: UserService, private postService: PubService) { }

  ngOnInit(): void {

    this.service.getUserByUsername(localStorage.getItem("username")).pipe(
      mergeMap((data1: any)=>{
        this.user = data1
        return this.postService.getAllPosts().pipe(
          mergeMap(data2 =>{
            this.posts = data2;
            return this.service.getAllUsers().pipe(
              map(data3 =>{
                this.allUsers = data3;
              })
            )
          })
        )
      })
    ).subscribe()


  }

}
