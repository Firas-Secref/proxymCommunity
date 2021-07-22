import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-publications-card',
  templateUrl: './publications-card.component.html',
  styleUrls: ['./publications-card.component.scss']
})
export class PublicationsCardComponent implements OnInit, OnChanges {

  @Input() postsInput !: any;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    console.log(this.postsInput)
  }

}
