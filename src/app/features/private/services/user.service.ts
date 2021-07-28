import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Developer} from "../../../model/Developer";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private findUserUrl = environment.findUserUrl;
  private updateUserUrl = environment.updateUser;
  private updateImage = environment.updateProfileImage;
  private allUsersUrl = environment.getAllUsersUrl;
  constructor(private http: HttpClient) { }

  getUserByUsername(username: string | null): Observable<Developer>{
    return this.http.get<Developer>(`${this.findUserUrl}/${username}`);
  }

  updateUser(id: number, user: Developer): Observable<Developer>{
    console.log(user);
    return this.http.post<Developer>(`${this.updateUserUrl}/${id}`, user);
  }

  updateProfileImage(id: number, image: FormData): Observable<any>{
    return this.http.post<any>(`${this.updateImage}/${id}`, image)
  }

  getAllUsers(): Observable<any>{
    return this.http.get<any>(`${this.allUsersUrl}`);
  }

}
