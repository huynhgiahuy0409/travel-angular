import { APIResponse } from './../../shared/models/model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/app/shared/models/constant';
import { UserInfoResponse } from 'src/app/shared/models/response';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userBSub = new BehaviorSubject<UserInfoResponse | null>(null);
  user$ = this.userBSub.asObservable();
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    params: {},
  };
  constructor(private httpClient: HttpClient) {
    this.user$.subscribe((v) => console.log(v));
  }
  getUserInfo(userId: number): Observable<APIResponse<UserInfoResponse>> {
    const url = `${BASE_URL}/public/users/${userId}`;
    return this.httpClient.get<APIResponse<UserInfoResponse>>(
      url,
      this.httpOptions
    );
  }
  findUserByUsername(username: string): Observable<UserInfoResponse> {
    const url = `${BASE_URL}/public/users/username/${username}`;
    return this.httpClient.get<UserInfoResponse>(url, this.httpOptions);
  }
}
