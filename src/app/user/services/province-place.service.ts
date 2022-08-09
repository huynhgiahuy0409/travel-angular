import { BASE_URL } from 'src/app/shared/models/constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProvincePlaceResponse } from 'src/app/shared/models/response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProvincePlaceService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private httpClient: HttpClient) { }
  findPlaceByProvinceId(provinceId: number): Observable<ProvincePlaceResponse[]>{
    const url = `${BASE_URL}/member/province/${provinceId}/province-places`
    return this.httpClient.get<ProvincePlaceResponse[]>(url, this.httpOptions)
  }
}
