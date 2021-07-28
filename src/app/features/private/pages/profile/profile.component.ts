import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Developer} from "../../../../model/Developer";
import {map, mergeMap} from "rxjs/operators";
import {PubService} from "../../services/pub.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user!: any;
  myPosts!: any[];
  constructor(private service: UserService,private pubService: PubService, private router: Router) { }

  ngOnInit(): void {

    this.service.getUserByUsername(localStorage.getItem("username")).pipe(
      mergeMap((data1: any)=>{
        this.user = data1
        return this.pubService.getMyPosts(this.user.id).pipe(
          map(data2 =>{
            this.myPosts = data2;
          })
        )
      })
    ).subscribe()

  }

  navigateToEdit() {
    this.router.navigateByUrl("edit");
  }
}
