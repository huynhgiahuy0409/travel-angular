import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/shared/models/constant';
import { APIResponse, FilterCommercialPost, FilterReviewPost } from 'src/app/shared/models/model';
import { CommercialPostRequest } from 'src/app/shared/models/request';
import { CommercialPostResponse, ReviewPostResponse } from 'src/app/shared/models/response';
import { FilterPostService } from 'src/app/user/services/filter-post.service';

@Injectable({
  providedIn: 'root',
})
export class CommercialPostService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private httpClient: HttpClient) { }
  createCommercialPost(
    commercialPostRequest: CommercialPostRequest,
    coverMediaId?: number,
  ): Observable<APIResponse<CommercialPostResponse>> {
    const url = `${BASE_URL}/admin/commercial-post`;
    let httpOptions = {
      headers: this.httpOptions.headers,
      params: {}
    }
    if (coverMediaId) {
      httpOptions.params = {
        coverImageId: coverMediaId
      }
    }
   
    return this.httpClient.post<APIResponse<CommercialPostResponse>>(
      url,
      commercialPostRequest,
      httpOptions
    );
  }
  findAll(filter: FilterCommercialPost): Observable<CommercialPostResponse[]>{
    const url = `${BASE_URL}/member/commercial-posts`;
    let params = new HttpParams()
    if(filter.pageable){
      params = params.append('pageIndex', filter.pageable.pageIndex)  
      params = params.append('pageSize', filter.pageable.pageSize)
    }
    if(filter.pageable && filter.pageable.sortable){
      params = params.append("dir", filter.pageable.sortable.dir)
      params = params.append("order", filter.pageable.sortable.order)
    }
    if(filter.title){
      params = params.append("title", filter.title)
    }else if(filter.tag){
      params = params.append("tag", filter.tag)
    }
    let httpOptions = {
      headers: this.httpOptions.headers,
      params: params
    }
    console.log(params);
    
    return this.httpClient.get<CommercialPostResponse[]>(
      url,
      httpOptions
    );
  }
}
