import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notifucationUrl = environment.notificationUrl;

  constructor(private http: HttpClient) { }

  public getMyAllNotifications(id: number): Observable<any>{
    return this.http.get<any>(`${this.notifucationUrl}/${id}`);
  }
}
