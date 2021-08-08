import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Developer} from "../../../../../model/Developer";
import {Router} from "@angular/router";

@Component({
  selector: 'app-card-profile',
  templateUrl: './card-profile.component.html',
  styleUrls: ['./card-profile.component.scss']
})
export class CardProfileComponent implements OnInit, OnChanges {

  @Input() userInput!: Developer;
  @Input() postsNb!: number;
  @Input() follows!: number;
  @Input() likesNb!: number;


  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.userInput){
      console.log(this.userInput)
    }
  }

  goToProfile() {
    this.router.navigateByUrl("home/profile")
  }
}
