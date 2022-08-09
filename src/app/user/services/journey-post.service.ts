import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/app/shared/models/constant';
import { JourneyPostRequest } from 'src/app/shared/models/request';
import { JourneyPostResponse, ReviewPostResponse } from 'src/app/shared/models/response';
import { FilterJourneyPost, Pageable } from 'src/app/shared/models/model';

@Injectable({
  providedIn: 'root'
})
export class JourneyPostService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private httpClient: HttpClient) { }
  createJourneyPost(journeyPostRequest: JourneyPostRequest, coverImageId?: number): Observable<JourneyPostResponse>{
    const url = `${BASE_URL}/member/journey-post`;
    let httpOptions = coverImageId? {
      header: this.httpOptions.headers,
      params: new HttpParams({
        fromObject: {
          coverImageId: coverImageId
        }
      })
    } : this.httpOptions
    return this.httpClient.post<JourneyPostResponse>(url, journeyPostRequest, httpOptions)
  }
  findAll(filter: FilterJourneyPost){
    const url = `${BASE_URL}/member/journey-posts`;
    let params = new HttpParams()
    params = params.append('pageIndex', filter.pageable.pageIndex)  
    params = params.append('pageSize', filter.pageable.pageSize)
    if(filter.pageable.sortable){
      params = params.append("dir", filter.pageable.sortable.dir)
      params = params.append("order", filter.pageable.sortable.order)
    }
    if(filter.title){
      params = params.append("title", filter.title)
    }else if(filter.totalDay){
      params = params.append("totalDay", filter.totalDay)
    }else if(filter.totalCost){
      params = params.append("totalCost", filter.totalCost)
    }else if(filter.totalParticipant){
      params = params.append("totalParticipant", filter.totalParticipant)
    }else if(filter.departurePlace){
      params = params.append("departurePlace", filter.departurePlace)
    }
    let httpOptions = {
      headers: this.httpOptions.headers,
      params: params
    }
    
    return this.httpClient.get<JourneyPostResponse[]>(
      url,
      httpOptions
    );
  }
  findById(id: number){
    const url = `${BASE_URL}/member/journey-post/${id}`;
    return this.httpClient.get<JourneyPostResponse>(
      url,
      this.httpOptions
    );
  }
  findAllByUserIdWithPaging(userId: number, pageable: Pageable): Observable<JourneyPostResponse[]>{
    const url = `${BASE_URL}/member/user/${userId}/journey-posts`
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
    
    return this.httpClient.get<JourneyPostResponse[]>(
      url,
      httpOptions
    );
  }
}
