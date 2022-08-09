import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/shared/models/constant';
import { DistrictResponse, ProvinceResponse, WardResponse } from 'src/app/shared/models/response';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    params: {},
  };
  constructor(private httpClient: HttpClient) { }
  findAllProvince(): Observable<ProvinceResponse[]>{
    const url = `${BASE_URL}/member/users/provinces`;
    return this.httpClient.get<ProvinceResponse[]>(url, this.httpOptions)
  }
  findAllDistrictByProvince(provinceId: number):Observable<DistrictResponse[]>{
    const url = `${BASE_URL}/member/users/province/${provinceId}/districts`;
    return this.httpClient.get<DistrictResponse[]>(url, this.httpOptions)
  }
  findAllWardsByProvinceDistrict(provinceId: number, districtId: number){
    const url = `${BASE_URL}/member/users/province/${provinceId}/district/${districtId}/wards`;
    return this.httpClient.get(url, this.httpOptions)
  }
  combineToAddress(province: ProvinceResponse, district:DistrictResponse, ward: WardResponse){
    return ward.prefix + " " + ward.name + ", " + district.prefix + " " + district.name + ", " + province.name 
  }
}
