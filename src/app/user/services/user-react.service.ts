import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/shared/models/constant';
import { Pageable } from 'src/app/shared/models/model';
import { PagingResponse, UserReactResponse } from 'src/app/shared/models/response';

@Injectable({
  providedIn: 'root'
})
export class UserReactService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    params: {},
  };
  constructor(private httpClient: HttpClient){ }
  updateUserReact(userId: number, react: number, reviewPostId: number): Observable<UserReactResponse>{
    let url = `${BASE_URL}/member/user/${userId}/react/${react}/review-post/${reviewPostId}`;
    return this.httpClient.post<UserReactResponse>(url, null, this.httpOptions)
  }
  findAllByPostAndReact(postId: number, react: number, pageable: Pageable): Observable<PagingResponse<UserReactResponse>>{
    const url = `${BASE_URL}/member/review-post/${postId}/react/${react}/user-reacts`;
    let params = new HttpParams()
    params = params.append('pageIndex', pageable.pageIndex)  
    params = params.append('pageSize', pageable.pageSize)
    if(pageable.sortable){
      params = params.append("dir", pageable.sortable.dir)
      params = params.append("order", pageable.sortable.order)
    }
    let httpOptions = {
      headers: this.httpOptions.headers,
      params: params
    }
    return this.httpClient.get<PagingResponse<UserReactResponse>>(
      url,
      httpOptions
    );
  }
}
