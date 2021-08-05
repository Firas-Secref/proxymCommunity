import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Developer} from "../../../../../model/Developer";
import {Route, Router} from "@angular/router";
import {Friends} from "../../../../../model/Friends";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, OnChanges {

  constructor(private router: Router, private service: UserService){}
  @Output() sendNewFriend = new EventEmitter<number>();
  @Input() suggestions!: Developer[];
  user!: Developer

  ngOnInit() {
    this.service.getUserByUsername(localStorage.getItem("username")).subscribe((user:Developer) =>{
      this.user = user;
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
      console.log(this.suggestions)
  }

  navigateToUsersList() {
    this.router.navigateByUrl("home/usersList")
  }

  follow(id: number, user: Developer) {
    let friends = new Friends(this.user.id, id);
    console.log(friends);
    console.log(this.suggestions)
    this.suggestions.splice(this.suggestions.indexOf(user),1)
    this.service.follow(friends).subscribe((data: any)=>{
      console.log("follow")
      console.log(data)
      this.sendNewFriend.emit(1);

    })
  }

}
