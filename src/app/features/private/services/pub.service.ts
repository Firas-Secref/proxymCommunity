import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {Likes} from "../../../model/Likes";
import {Developer} from "../../../model/Developer";

@Injectable({
  providedIn: 'root'
})
export class PubService {

  newPubUrl = environment.newPostUrl;
  allPostUrl = environment.allPostsUrl;
  myPostsUrl = environment.myPostsUrl;
  likeThatPost = environment.likePostUrl;
  likeNbUrl = environment.likesNbUrl;
  deleteLikeUrl = environment.deleteLikeUrl;
  myFriendsPostsUrl = environment.myFriendsPostsUrl;
  constructor(private http: HttpClient) { }

  public newPost(formData: FormData): Observable<any>{
    return this.http.post<any>(`${this.newPubUrl}`, formData);
  }

  public getAllPosts(id: number): Observable<any>{
    return this.http.get<any>(`${this.allPostUrl}/${id}`);
  }

  public getMyPosts(id: number): Observable<any>{
    return this.http.get<any>(`${this.myPostsUrl}/${id}`);
  }

  public addLikes(like: Likes): Observable<any>{
    return this.http.post<any>(`${this.likeThatPost}`,like);
  }

  public getLikeNb(postId: number): Observable<number>{
    return this.http.get<number>(`${this.likeNbUrl}/${postId}`);
  }

  public deleteLike(likerId: number, postId: number): Observable<any>{
    return this.http.delete<any>(`${this.deleteLikeUrl}/${likerId}/${postId}`)
  }

  public getMyFriendsPosts(id: number): Observable<Developer[]>{
    return this.http.get<Developer[]>(`${this.myFriendsPostsUrl}/${id}`);
  }
}
