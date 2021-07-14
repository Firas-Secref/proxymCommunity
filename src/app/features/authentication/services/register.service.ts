import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  private registerUrlDeveloper = environment.registerUrl;

  public firstRegister(developer: any): Observable<any>{
    return this.http.post<any>(`${this.registerUrlDeveloper}`, developer);
  }
}
