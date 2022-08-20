import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BASE_URL } from 'src/app/shared/models/constant';
import {
  APIResponse,
  FilterJourneyPost,
  FilterReviewPost,
  Pageable,
  Sortable,
} from 'src/app/shared/models/model';
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
  };
  constructor(private httpClient: HttpClient) {}
  createReviewPost(
    reviewPostRequest: ReviewPostRequest,
    coverMediaId?: number,
    postMediaIds?: number[]
  ): Observable<APIResponse<ReviewPostResponse>> {
    const url = `${BASE_URL}/member/review-post`;

    let paramsObject = {
      coverImageId: -1 || null,
      reviewPostImageIds: [-1],
    };
    if (coverMediaId) {
      paramsObject.coverImageId = coverMediaId;
    }
    if (postMediaIds) {
      paramsObject.reviewPostImageIds = postMediaIds;
    }
    let httpOptions = {
      headers: this.httpOptions.headers,
      params: new HttpParams({
        fromObject: paramsObject,
      }),
    };
    return this.httpClient.post<APIResponse<ReviewPostResponse>>(
      url,
      reviewPostRequest,
      httpOptions
    );
  }
  findById(id: number): Observable<ReviewPostResponse> {
    const url = `${BASE_URL}/member/review-post/${id}`;
    return this.httpClient.get<ReviewPostResponse>(url, this.httpOptions);
  }
  findAll(filter: FilterReviewPost) {
    const url = `${BASE_URL}/member/review-posts`;
    let params = new HttpParams();
    if(filter.pageable){
      params = params.append('pageIndex', filter.pageable.pageIndex);
      params = params.append('pageSize', filter.pageable.pageSize);
    }
    if (filter.pageable && filter.pageable.sortable) {
      params = params.append('dir', filter.pageable.sortable.dir);
      params = params.append('order', filter.pageable.sortable.order);
    }
    if (filter.title) {
      params = params.append('title', filter.title);
    } else if (filter.tag) {
      params = params.append('tag', filter.tag);
    } else if (filter.cost) {
      params = params.append('cost', filter.cost);
    } else if (filter.provinceName) {
      params = params.append('provinceName', filter.provinceName);
    }

    if (filter.status) {
      params = params.append('status', filter.status);
    }
    if (filter.createDateRange) {
      params = params.append('srcCreateDate', filter.createDateRange[0]);
      params = params.append('desCreateDate', filter.createDateRange[1]);
    }
    if (filter.provinceId) {
      params = params.append('provinceId', filter.provinceId);
    }
    if (filter.postUserId) {
      params = params.append('postUserId', filter.postUserId);
    }

    let httpOptions = {
      headers: this.httpOptions.headers,
      params: params,
    };

    return this.httpClient.get<ReviewPostResponse[]>(url, httpOptions);
  }
  updateByStatus(
    postId: number,
    status: String
  ): Observable<ReviewPostResponse> {
    const url = `${BASE_URL}/admin/status/${status}/review-post/${postId}`;
    return this.httpClient.post<ReviewPostResponse>(url, this.httpOptions);
  }
  countAll(status?: string){
    const url = `${BASE_URL}/member/count/review-posts`;
    let params = new HttpParams();
    if (status) {
      params = params.append('status', status);
    }
    let httpOptions = {
      headers: this.httpOptions.headers,
      params: params,
    };
    return this.httpClient.get<number>(url, httpOptions);
  }
}
