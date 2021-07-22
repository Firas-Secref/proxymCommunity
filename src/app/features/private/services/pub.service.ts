import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PubService {

  newPubUrl = environment.newPostUrl;
  allPostUrl = environment.allPostsUrl;
  myPostsUrl = environment.myPostsUrl;
  constructor(private http: HttpClient) { }

  public newPost(formData: FormData): Observable<any>{
    return this.http.post<any>(`${this.newPubUrl}`, formData);
  }

  public getAllPosts(): Observable<any>{
    return this.http.get<any>(`${this.allPostUrl}`);
  }

  public getMyPosts(id: number): Observable<any>{
    return this.http.get<any>(`${this.myPostsUrl}/${id}`);
  }
}
