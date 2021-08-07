import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  private _source = new Subject<any>();
  message$ = this._source.asObservable();
  private _sourceNotif = new Subject<any>();
  norificationInfo$ = this._sourceNotif.asObservable();
  constructor() { }

  sendData(data: any){
    this._source.next(data);
  }

  sendNewNotification(data: any){
    this._sourceNotif.next(data)
  }


}
