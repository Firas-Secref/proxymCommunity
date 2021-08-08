import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {Developer} from "../../../../../model/Developer";
import {map, mergeMap} from "rxjs/operators";
import {Friends} from "../../../../../model/Friends";
// @ts-ignore
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import {Notification} from "../../../../../model/Notification";
import {InteractionService} from "../../../services/interaction.service";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  usersList!: Developer[];
  currentUserID!: number;
  currentUser!: Developer;

  greetings: string[] = [];
  disabled = true;
  name!: string;
  private stompClient: any = null;

  constructor(private service: UserService, private interaction: InteractionService) { }

  ngOnInit(): void {
    this.connect();
    this.service.getUserByUsername(localStorage.getItem("username")).pipe(
      mergeMap((currentUser: Developer)=>{
        this.currentUserID = currentUser.id;
        this.currentUser = currentUser;
        return this.service.getAllUsers(this.currentUserID).pipe(
          map((users: Developer[])=>{
            this.usersList = users
          })
        )
      })
    ).subscribe()
  }

  follow(user: Developer) {
    const notificationTextForNewFollow ="   is now following you";
    const notification = new Notification(this.currentUser.id,this.currentUser.firstName, this.currentUser.lastName,
      this.currentUser.username, user.firstName, user.lastName, user.username, user.id,
      this.currentUser.profileImage, "follow", notificationTextForNewFollow );
    this.sendNotification(notification);

    let friends = new Friends(this.currentUserID, user.id);
    this.usersList.splice(this.usersList.indexOf(user),1);
    this.service.follow(friends).subscribe((data: any)=>{
      console.log("follow")
      console.log(data)
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
