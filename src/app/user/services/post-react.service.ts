import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/shared/models/constant';
import { Pageable } from 'src/app/shared/models/model';
import { PagingResponse, PostReactResponse, UserReactResponse } from 'src/app/shared/models/response';

@Injectable({
  providedIn: 'root'
})
export class PostReactService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    params: {},
  };
  constructor(private httpClient: HttpClient) { }
  findByReviewPostId(postId: number): Observable<PostReactResponse> {
    const url = `${BASE_URL}/member/review-post/${postId}/post-react`;
    return this.httpClient.get<PostReactResponse>(
      url,
      this.httpOptions
    );
  }
  findByJourneyPostId(postId: number): Observable<PostReactResponse> {
    const url = `${BASE_URL}/member/journey-post/${postId}/post-react`;
    return this.httpClient.get<PostReactResponse>(
      url,
      this.httpOptions
    );
  }
}
