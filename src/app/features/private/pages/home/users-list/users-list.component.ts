import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {Developer} from "../../../../../model/Developer";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  usersList!: Developer[]

  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.service.getAllUsers().subscribe((data: Developer[])=>{
      this.usersList = data;
    })
  }

}
