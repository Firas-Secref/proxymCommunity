import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = environment.loginUrl
  constructor(private http: HttpClient) { }

  public login(user: any):Observable<any>{
    return this.http.post<any>(`${this.loginUrl}`, user)
  }

  loggedIn(){
    return !!localStorage.getItem("username");
  }
}
