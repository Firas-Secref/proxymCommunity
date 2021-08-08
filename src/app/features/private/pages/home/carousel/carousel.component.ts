import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Developer} from "../../../../../model/Developer";
import {Route, Router} from "@angular/router";
import {Friends} from "../../../../../model/Friends";
import {UserService} from "../../../services/user.service";
// @ts-ignore
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import {InteractionService} from "../../../services/interaction.service";
import {Notification} from "../../../../../model/Notification";
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, OnChanges {

  constructor(private router: Router, private service: UserService, private interaction: InteractionService){}
  @Output() sendNewFriend = new EventEmitter<number>();
  @Input() suggestions!: Developer[];
  user!: Developer;

  greetings: string[] = [];
  disabled = true;
  name!: string;
  private stompClient: any = null;

  ngOnInit() {
    this.connect();
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
    const notificationTextForNewFollow ="   is now following you";
    const notification = new Notification(this.user.id,this.user.firstName, this.user.lastName,
      this.user.username, user.firstName, user.lastName, user.username, user.id,
      this.user.profileImage, "follow", notificationTextForNewFollow );
    console.log(notification)
    this.sendNotification(notification);
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

  connect() {
    const socket = new SockJS('http://localhost:8080/notification-endpoint');
    this.stompClient = Stomp.over(socket);

    const _this = this;
    this.stompClient.connect({}, function (frame: any) {
      _this.setConnected(true);
      console.log('Connected: ' + frame);

      _this.stompClient.subscribe('/topic/newNotifFollow', function (hello: any) {
        _this.interaction.sendNewFollowNotification(
          JSON.parse(hello.body)
        )
      });
    });
  }

  setConnected(connected: boolean) {
    this.disabled = !connected;

    if (connected) {
      this.greetings = [];
    }
  }

  sendNotification(notification: Notification) {
    this.stompClient.send(
      '/notif/notificationForNewFollow',
      {},
      JSON.stringify(notification)
    );
  }

}
