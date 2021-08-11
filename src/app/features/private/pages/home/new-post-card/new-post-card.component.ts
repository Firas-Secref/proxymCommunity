import {Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter} from '@angular/core';

import {Developer} from "../../../../../model/Developer";
import {map, mergeMap} from "rxjs/operators";
import {PubService} from "../../../services/pub.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Publication} from "../../../../../model/Publication";
import {UserService} from "../../../services/user.service";
import {ToastrService} from "ngx-toastr";
import {InteractionService} from "../../../services/interaction.service";
// @ts-ignore
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import {Notification} from "../../../../../model/Notification";
@Component({
  selector: 'app-new-post-card',
  templateUrl: './new-post-card.component.html',
  styleUrls: ['./new-post-card.component.scss']
})
export class NewPostCardComponent implements OnInit, OnChanges {

  constructor(private modalService: NgbModal, private pubSservice : PubService, private fb: FormBuilder,
              private userService: UserService, private toastr: ToastrService, private interaction: InteractionService) { }
  @Input() userInput!: Developer;
  @Output() updatePosts = new EventEmitter<any>()
  publicationForm!: FormGroup;
  image!: File;
  loaded1: any;
  selectedCategorie!: string;
  newPost!: Publication;

  greetings: string[] = [];
  disabled = true;
  name!: string;
  private stompClient: any = null;

  ngOnInit(): void {
    this.initForm();
  }

  openDialog(content: any) {
    this.modalService.open(content, { size: 'md' })
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("haha",this.userInput)
  }

  initForm(){
    this.publicationForm = this.fb.group({
      text: [""]
    })
  }

  onFileChanged(event: any) {
    this.image = event.target.files[0];
    console.log(this.image);
    var reader = new FileReader();
    reader.readAsDataURL(this.image);
    reader.onload = ()=>{
      this.loaded1 = reader.result;
    }

  }

  publier() {
    console.log(this.loaded1)
    console.log(this.publicationForm.value.text)
    let formData = new FormData();
    if (this.loaded1){
      formData.append("pubImage", this.image);
    }
    let pubText = this.publicationForm.value.text;
    let categorie = this.selectedCategorie;

    const pub = new Publication(pubText, categorie);
    formData.append("pub", JSON.stringify(pub));
    formData.append("user", JSON.stringify(this.userInput));

    this.pubSservice.newPost(formData).subscribe((newPost: Publication) =>{
      this.newPost = newPost;
      this.updatePosts.emit(this.newPost)
      this.toastr.success("Post Added successfully ..");
      this.loaded1 = null;
      this.publicationForm.reset();
    })
  }

  connect() {
    const socket = new SockJS('http://localhost:8080/notification-endpoint');
    this.stompClient = Stomp.over(socket);

    const _this = this;
    this.stompClient.connect({}, function (frame: any) {
      _this.setConnected(true);
      console.log('Connected: ' + frame);

      _this.stompClient.subscribe('/topic/newNotifPost', function (hello: any) {
        _this.interaction.sendData({
          "newNotification":JSON.parse(hello.body),
          "updateBadge": true
        })
      });
    });
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

  sendNotification(notification: Notification) {
    this.stompClient.send(
      '/notif/notificationForNewPost',
      {},
      JSON.stringify(notification)
    );
  }

}
