import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Developer} from "../../../../../model/Developer";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, OnChanges {

  constructor(private router: Router){}
  @Input() suggestions!: Developer[];

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
      console.log(this.suggestions)
  }

  navigateToUsersList() {
    this.router.navigateByUrl("usersList")
  }
}
