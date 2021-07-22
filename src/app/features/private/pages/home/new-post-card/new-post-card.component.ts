import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {NewPubComponent} from "./new-pub/new-pub.component";
import {Developer} from "../../../../../model/Developer";

@Component({
  selector: 'app-new-post-card',
  templateUrl: './new-post-card.component.html',
  styleUrls: ['./new-post-card.component.scss']
})
export class NewPostCardComponent implements OnInit, OnChanges {

  constructor(private dialog: MatDialog) { }
  @Input() userInput!: Developer;

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(NewPubComponent, {
      width: "50%",
      data: {firstName: this.userInput.firstName,
      lastname: this.userInput.lastName,
      userImage: this.userInput.profileImage}
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("haha",this.userInput)
  }
}
