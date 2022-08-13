import { APIResponse } from './../../shared/models/model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/app/shared/models/constant';
import { UserProfileResponse } from 'src/app/shared/models/response';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userBSub = new BehaviorSubject<UserProfileResponse | null>(null);
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
  findByUserId(userId: number): Observable<UserProfileResponse> {
    const url = `${BASE_URL}/public/users/${userId}`;
    return this.httpClient.get<UserProfileResponse>(
      url,
      this.httpOptions
    );
  }
  findUserByUsername(username: string): Observable<UserProfileResponse> {
    const url = `${BASE_URL}/public/users/username/${username}`;
    return this.httpClient.get<UserProfileResponse>(url, this.httpOptions);
  }
  
}
