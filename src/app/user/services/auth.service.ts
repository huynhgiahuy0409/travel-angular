import { Observable } from 'rxjs/internal/Observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/app/shared/models/constant';
import { LoginRequest, RegisterRequest } from 'src/app/shared/models/request';
import { APIResponse } from 'src/app/shared/models/model';
import {
  AuthenticationResponse,
  JWTResponse,
  UserInfoResponse,
} from 'src/app/shared/models/response';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  JWTBSub = new BehaviorSubject<JWTResponse | null>(null);
  JWT$ = this.JWTBSub.asObservable();
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    params: {},
  };
  constructor(private httpClient: HttpClient) {
    this.JWT$.subscribe(v => console.log(v));
  }
  validOTP(code: string, userId: number): Observable<APIResponse<AuthenticationResponse>> {
    const url = `${BASE_URL}/auth/user/${userId}/verification`;
    let headers = this.httpOptions.headers
    headers = headers.append('code', code)
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "code": code
      })
    }
    return this.httpClient.get<APIResponse<AuthenticationResponse>>(url, options);
  }
  register(registerRequest: RegisterRequest): Observable<APIResponse<any>> {
    const url = `${BASE_URL}/public/users/registration`;
    return this.httpClient.post<APIResponse<any>>(
      url,
      registerRequest,
      this.httpOptions
    );
  }
  checkExistUser(username: string): Observable<UserInfoResponse> {
    const url = `${BASE_URL}/auth/exist/user/${username}`;
    return this.httpClient.get<UserInfoResponse>(url, this.httpOptions);
  }
  generateOTP(username: string): void{
    const url = `${BASE_URL}/auth/generate/otp/user/${username}`;
    this.httpClient.get(url, this.httpOptions).subscribe();
  }
  login(
    loginRequest: LoginRequest
  ): Observable<APIResponse<UserInfoResponse | AuthenticationResponse | null>> {
    const url = `${BASE_URL}/public/users/login`;
    return this.httpClient.post<
      APIResponse<UserInfoResponse | AuthenticationResponse | null>
    >(url, loginRequest, this.httpOptions);
  }
  recoveryPassword(password: string, code: string, userId: number): Observable<APIResponse<null>>{
    const url = `${BASE_URL}/auth/recover/password/user/${userId}`;
    return this.httpClient.post<APIResponse<null>>(url, {
      password: password,
      code: code
    }, this.httpOptions);
  }
}
