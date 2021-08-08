import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  private _source = new Subject<any>();
  message$ = this._source.asObservable();
  private _sourceNotifFollow = new Subject<any>();
  norificationFollow$ = this._sourceNotifFollow.asObservable();
  constructor() { }

  sendData(data: any){
    this._source.next(data);
  }

  sendNewFollowNotification(data: any){
    this._sourceNotifFollow.next(data)
  }


}
