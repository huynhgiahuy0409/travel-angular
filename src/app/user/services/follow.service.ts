import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BASE_URL } from 'src/app/shared/models/constant';
import { APIResponse } from 'src/app/shared/models/model';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    params: {},
  };
  constructor(private httpClient: HttpClient) {
  }
  checkFollowPostUser(postUser:number): Observable<Boolean>{
    const url = `${BASE_URL}/member/user/me/follow/user/${postUser}`;
    return this.httpClient.get<Boolean>(url, this.httpOptions)
  }
  requestFollow(postUser:number): Observable<APIResponse<null>>{
    const url = `${BASE_URL}/member/users/me/follow/${postUser}`;
    return this.httpClient.get<APIResponse<null>>(url, this.httpOptions)
  }
  requestUnfollow(postUser:number): Observable<APIResponse<null>>{
    const url = `${BASE_URL}/member/users/me/unfollow/${postUser}`;
    return this.httpClient.get<APIResponse<null>>(url, this.httpOptions)
  }
}
