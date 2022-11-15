import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BASE_URL } from 'src/app/shared/models/constant';
import { FilterComment } from 'src/app/shared/models/model';
import { CommentRequest } from 'src/app/shared/models/request';
import { CommentResponse, PostCommentResponse } from 'src/app/shared/models/response';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  postCommentFilterBSub!: BehaviorSubject<FilterComment>
  postCommentFilter$!: Observable<FilterComment>
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private httpClient: HttpClient) {
    let initPostCommentFilter: FilterComment = {
      pageable: {
        pageIndex: 0,
        pageSize: 5,
        sortable: {
          dir: "DESC",
          order: 'createdDate'
        }
      },
    }
    this.postCommentFilterBSub = new BehaviorSubject(initPostCommentFilter)
  }
  findPostComment(filter: FilterComment, postType: string){
    const url = `${BASE_URL}/member/post-comment`;
    let params = new HttpParams();
    params = params.append('postType', postType);
    if(filter.pageable){
      params = params.append('pageIndex', filter.pageable.pageIndex);
      params = params.append('pageSize', filter.pageable.pageSize);
    }
    if (filter.pageable && filter.pageable.sortable) {
      params = params.append('dir', filter.pageable.sortable.dir);
      params = params.append('order', filter.pageable.sortable.order);
    }
    if (filter.postId) {
      params = params.append('postId', filter.postId);
    }
    let httpOptions = {
      headers: this.httpOptions.headers,
      params: params,
    };
    return this.httpClient.get<PostCommentResponse>(url, httpOptions);
  }
  findChildComments(filter: FilterComment){
    const url = `${BASE_URL}/member/parent-comment/${filter.parentCommentId}/child-comments`;
    console.log(filter);
    
    let params = new HttpParams();
    if(filter.pageable){
      params = params.append('pageIndex', filter.pageable.pageIndex);
      params = params.append('pageSize', filter.pageable.pageSize);
    }
    if (filter.pageable && filter.pageable.sortable) {
      params = params.append('dir', filter.pageable.sortable.dir);
      params = params.append('order', filter.pageable.sortable.order);
    }
    if (filter.parentCommentId) {
      params = params.append('parentCommentId', filter.parentCommentId);
    }
    let httpOptions = {
      headers: this.httpOptions.headers,
      params: params,
    };
    return this.httpClient.get<CommentResponse[]>(url, httpOptions);
  }
  updateReviewPostComment(commentRequest: CommentRequest){
    const url = `${BASE_URL}/member/comment/review-post/${commentRequest.postId}`;
    return this.httpClient.post<CommentResponse>(url, commentRequest, this.httpOptions);
  }
  updateParentComment(commentRequest: CommentRequest, parentCommentId: number){
    const url = `${BASE_URL}/member/child-comment/comment/${parentCommentId}`;
    return this.httpClient.post<CommentResponse>(url, commentRequest, this.httpOptions);
  }
}
