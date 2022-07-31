import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BASE_URL } from 'src/app/shared/models/constant';
import { APIResponse, Pageable } from 'src/app/shared/models/model';
import { ReviewPostRequest } from 'src/app/shared/models/request';
import { ReviewPostResponse } from 'src/app/shared/models/response';

@Injectable({
  providedIn: 'root',
})
export class ReviewPostService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    params: new HttpParams(),
  };
  constructor(private httpClient: HttpClient) {}
  createReviewPost(
    reviewPostRequest: ReviewPostRequest,
    coverMediaId?: number,
    postMediaIds?: number[]
  ): Observable<APIResponse<number>> {
    const url = `${BASE_URL}/member/review-post`;
    console.log(coverMediaId);
    console.log(postMediaIds);
    
    if (coverMediaId) {
      this.httpOptions.params = this.httpOptions.params.set('coverImageId', coverMediaId);
    }
    if (postMediaIds) {
      this.httpOptions.params = this.httpOptions.params.set('reviewPostImageIds', postMediaIds + '');
    }
    console.log(this.httpOptions);
    
    return this.httpClient.post<APIResponse<number>>(
      url,
      reviewPostRequest,
      this.httpOptions
    );
  }
  findById(id: number){
    const url = `${BASE_URL}/member/review-post/${id}`;
    return this.httpClient.get<ReviewPostResponse>(
      url,
      this.httpOptions
    );
  }
  findAll(pageable: Pageable){
    const url = `${BASE_URL}/member/review-posts`;
    this.httpOptions.params = new HttpParams({
      fromObject: {
        pageIndex: pageable.pageIndex,
        pageSize: pageable.pageSize,
      }
    })
    return this.httpClient.get<ReviewPostResponse[]>(
      url,
      this.httpOptions
    );
  }
}
