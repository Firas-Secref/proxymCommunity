import {Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Likes} from "../../../../../model/Likes";
import {PubService} from "../../../services/pub.service";
import {Developer} from "../../../../../model/Developer";
import {InteractionService} from "../../../services/interaction.service";
// @ts-ignore
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import {Notification} from "../../../../../model/Notification";

@Component({
  selector: 'app-publications-card',
  templateUrl: './publications-card.component.html',
  styleUrls: ['./publications-card.component.scss']
})
export class PublicationsCardComponent implements OnInit, OnChanges {

  @Input() postsInput !: any[];
  @Input() userInput!: Developer;
  @Output() addNewLike = new EventEmitter<number>();
  @Output() removeLike = new EventEmitter<number>();


  greetings: string[] = [];
  disabled = true;
  name!: string;
  private stompClient: any = null;

  constructor(private postService: PubService, private interaction: InteractionService) { }

  ngOnInit(): void {
    this.connect()
  }

  ngOnChanges(): void {
    console.log(this.postsInput);
    console.log(this.userInput);
  }

  updateLikes(id: number, i: number) {
    const notificationTextForNewLike ="   likes your post: \""+this.postsInput[i].text + " \"";
    console.log(notificationTextForNewLike);
    const notification: Notification = new Notification(this.userInput.id, this.userInput.firstName, this.userInput.lastName, this.userInput.username,
      this.postsInput[i].firstName, this.postsInput[i].lastName, this.postsInput[i].username, this.postsInput[i].userId, this.userInput.profileImage, "like", notificationTextForNewLike);
    console.log(notification);
    this.sendNotification(notification);

    if(this.postsInput[i].userId == this.userInput.id){
      this.addNewLike.emit(1);
    }
    this.postsInput[i].ilikeIt = true;
    this.postsInput[i].likesNb ++;
    let newLike = new Likes(this.userInput.id, id);
    console.log(newLike)
    this.postService.addLikes(newLike).subscribe((data: any)=>{
      console.log("like added");
    })
  }

  deleteLike(postId: number, i: number){
    if(this.postsInput[i].userId == this.userInput.id){
      this.removeLike.emit(1);
    }
    this.postsInput[i].ilikeIt = false;
    this.postsInput[i].likesNb --;
    this.postService.deleteLike(this.userInput.id, postId).subscribe((data: any)=>{
      console.log("like removed")
    })
  }



  connect() {
    const socket = new SockJS('http://localhost:8080/notification-endpoint');
    this.stompClient = Stomp.over(socket);

    const _this = this;
    this.stompClient.connect({}, function (frame: any) {
      _this.setConnected(true);
      console.log('Connected: ' + frame);

      _this.stompClient.subscribe('/topic/newNotifLike', function (hello: any) {
        _this.interaction.sendData({
          "newNotification":JSON.parse(hello.body),
          "updateBadge": true
        })
      });
    });
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }

    this.setConnected(false);
    console.log('Disconnected!');
  }

  sendNotification(notification: Notification) {
    this.stompClient.send(
      '/notif/notificationForLike',
      {},
      JSON.stringify(notification)
    );
  }

  setConnected(connected: boolean) {
    this.disabled = !connected;

    if (connected) {
      this.greetings = [];
    }
  }

  showGreeting(message: string) {
    this.greetings.push(message);
  }


}
