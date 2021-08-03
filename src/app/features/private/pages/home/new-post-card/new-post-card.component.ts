import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {NewPubComponent} from "./new-pub/new-pub.component";
import {Developer} from "../../../../../model/Developer";
import {map, mergeMap} from "rxjs/operators";
import {PubService} from "../../../services/pub.service";

@Component({
  selector: 'app-new-post-card',
  templateUrl: './new-post-card.component.html',
  styleUrls: ['./new-post-card.component.scss']
})
export class NewPostCardComponent implements OnInit, OnChanges {

  constructor(private dialog: MatDialog,
              private service : PubService) { }
  @Input() userInput!: Developer;

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(NewPubComponent, {
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
