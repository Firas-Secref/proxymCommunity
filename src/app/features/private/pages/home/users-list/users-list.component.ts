import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {Developer} from "../../../../../model/Developer";
import {map, mergeMap} from "rxjs/operators";
import {Friends} from "../../../../../model/Friends";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  usersList!: Developer[];
  currentUserID!: number;

  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.service.getUserByUsername(localStorage.getItem("username")).pipe(
      mergeMap((currentUser: Developer)=>{
        this.currentUserID = currentUser.id;
        return this.service.getAllUsers(this.currentUserID).pipe(
          map((users: Developer[])=>{
            this.usersList = users
          })
        )
      })
    ).subscribe()
  }

  follow(user: Developer) {
    let friends = new Friends(this.currentUserID, user.id);
    this.usersList.splice(this.usersList.indexOf(user),1);
    this.service.follow(friends).subscribe((data: any)=>{
      console.log("follow")
      console.log(data)
    })
  }
}
