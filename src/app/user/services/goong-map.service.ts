import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GOONG_URL, BASE_URL } from 'src/app/shared/models/constant';
import { ForwardGeocodingResponse, PlaceAutocompleteResponse } from 'src/app/shared/models/response';

@Injectable({
  providedIn: 'root'
})
export class GoongMapService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    }),
    params: {}
  }
  constructor(private httpClient: HttpClient) {
  }
  forwardGeocoding(address: string): Observable<ForwardGeocodingResponse> {
    const url = `${BASE_URL}/public/goong/geocode/address/${address}`
    return this.httpClient.get<ForwardGeocodingResponse>(url, this.httpOptions)
  }
  getPlaceAutocomplete(input: string): Observable<PlaceAutocompleteResponse>{
    const url = `${BASE_URL}/public/goong/place/autocomplete/${input}`
    return this.httpClient.get<PlaceAutocompleteResponse>(url, this.httpOptions)
  }
  getPlaceDetailByPlaceId(input: string): Observable<PlaceAutocompleteResponse>{
    const url = `${BASE_URL}/public/goong/place/autocomplete/${input}`
    return this.httpClient.get<PlaceAutocompleteResponse>(url, this.httpOptions)
  }
  
}
