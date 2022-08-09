import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/shared/models/constant';
import { APIResponse } from 'src/app/shared/models/model';
import { ParticipantResponse } from 'src/app/shared/models/response';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private httpClient: HttpClient){ }
  updateJourneyPostParticipant(requestUserId: number, journeyPostId: number, action : -1 | 0 | 1 | 2): Observable<ParticipantResponse>{
    const url = `${BASE_URL}/member/participant/journey-post/${journeyPostId}`;
    let httpOptions = {
      headers: this.httpOptions.headers,
      params: new HttpParams({
        fromObject: {
          requestUserId: requestUserId,
          action: action
        }
      })
    }
    return this.httpClient.post<ParticipantResponse>(url, null, httpOptions)
  }
}
