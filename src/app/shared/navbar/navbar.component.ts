import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {InteractionService} from "../../features/private/services/interaction.service";
import {Notification} from "../../model/Notification";
import {NotificationService} from "../../features/private/services/notification.service";
import {UserService} from "../../features/private/services/user.service";
import {map, mergeMap} from "rxjs/operators";
import {Developer} from "../../model/Developer";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  myNotification!: any[];
  currentUser!: Developer;
  badge: number = 0;

  constructor(private router: Router, private interaction: InteractionService,
              private notificationService: NotificationService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserByUsername(localStorage.getItem("username")).pipe(
      mergeMap((user: Developer)=>{
        this.currentUser = user;
        console.log(user.id)
        return this.notificationService.getMyAllNotifications(user.id).pipe(
          map((notifs: any[])=>{
            this.myNotification = notifs;
            console.log(this.myNotification)

          })
        )
      })
    ).subscribe();
    // this.notificationService.getMyAllNotifications()
    console.log("navbar")
    this.interaction.message$.subscribe((data: any)=>{
      console.log("data from socket", data);
      if (data.newNotification.to_userId == this.currentUser.id){
        this.myNotification.unshift(data.newNotification);
        this.badge++;
      }
    })

    this.interaction.norificationFollow$.subscribe((data: any) =>{
      console.log(data)
      if (data.to_userId == this.currentUser.id){
        this.myNotification.unshift(data);
        this.badge++;
      }
    })
  }


  logout() {
    localStorage.clear();
    this.router.navigateByUrl("auth/login");
  }

  goHome() {
    this.router.navigateByUrl("home")
  }

  goToChat() {
    this.router.navigateByUrl("home/chat")
  }

  goToProfile() {
    this.router.navigateByUrl("home/profile");
  }

  badgeRestart() {
    this.badge = 0;
  }
}
