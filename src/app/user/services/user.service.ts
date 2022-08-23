import { APIResponse, FilterUser } from './../../shared/models/model';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BASE_URL } from 'src/app/shared/models/constant';
import { UserProfileResponse } from 'src/app/shared/models/response';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DirectLinkService } from './direct-link.service';

@Injectable({
  providedIn: 'root',
})
export class UserService{
  userBSub = new BehaviorSubject<UserProfileResponse | null>(null);
  user$ = this.userBSub.asObservable().pipe(
    map(user => {
      if(user){
        const {avatar, coverImage} = user
        if(avatar){
          let directLinkAvatar = this.directLinkService.getDirectLinkAvatar(user.id, avatar.name, avatar.ext)
          avatar.directLink = directLinkAvatar
        }else{
          let defaultAvatar = this.directLinkService.getDefaultAvatarURL(user.gender)
          user.defaultAvatarURL = defaultAvatar
        }
        if(coverImage){
          let directLinkCoverImage = this.directLinkService.getDirectLinkCoverImage(user.id, coverImage.name, coverImage.ext)
          coverImage.directLink = directLinkCoverImage
        }
      }
      return user
    })
  );
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    params: {},
  };
  constructor(private httpClient: HttpClient, private directLinkService: DirectLinkService) {
  }
  findByUserId(userId: number): Observable<UserProfileResponse> {
    const url = `${BASE_URL}/public/users/${userId}`;
    return this.httpClient.get<UserProfileResponse>(
      url,
      this.httpOptions
    );
  }
  findUserByUsername(username: string): Observable<UserProfileResponse> {
    const url = `${BASE_URL}/public/users/username/${username}`;
    return this.httpClient.get<UserProfileResponse>(url, this.httpOptions);
  }
  findAll(filter: FilterUser){
    const url = `${BASE_URL}/member/users`;
    let params = new HttpParams();
    params = params.append('pageIndex', filter.pageable.pageIndex);
    params = params.append('pageSize', filter.pageable.pageSize);
    if (filter.pageable.sortable) {
      params = params.append('dir', filter.pageable.sortable.dir);
      params = params.append('order', filter.pageable.sortable.order);
    }
    if (filter.role) {
      params = params.append('role', filter.role);
    } 
    if (filter.active) {
      params = params.append('active', filter.active);
    } 
    if (filter.fullName) {
      params = params.append('fullName', filter.fullName);
    } 
    let httpOptions = {
      headers: this.httpOptions.headers,
      params: params,
    };

    return this.httpClient.get<UserProfileResponse[]>(url, httpOptions);
  }
  updateRole(role: string, userId: number){
    const url = `${BASE_URL}/admin/role/${role}/user/${userId}`;
    return this.httpClient.post<UserProfileResponse>(url, this.httpOptions);
  }
  getTotalUser(){
    const url = `${BASE_URL}/admin/count/users`;
    return this.httpClient.get<number>(url, this.httpOptions);
  }
  countByRoleNameAndActive(roleName: string, active: number){
    const url = `${BASE_URL}/admin/role/${roleName}/active/${active}/count/users`;
    return this.httpClient.get<number>(url, this.httpOptions);
  }
  updateActive(active: number, userId: number){
    const url = `${BASE_URL}/admin/active/${active}/user/${userId}`;
    return this.httpClient.post<UserProfileResponse>(url, this.httpOptions);
  }
  updateCoverByExistFile(coverImageId: number, userId: number){
    const url = `${BASE_URL}/member/cover-image/${coverImageId}/user/${userId}`;
    return this.httpClient.post<UserProfileResponse>(url, this.httpOptions);
  }
  updateAvatarByExistFile(avatarId: number, userId: number){
    const url = `${BASE_URL}/member/avatar/${avatarId}/user/${userId}`;
    return this.httpClient.post<UserProfileResponse>(url, this.httpOptions);
  }
  updateFullName(fullName: string, userId: number){
    const url = `${BASE_URL}/member/fullName/${fullName}/user/${userId}`;
    return this.httpClient.post<UserProfileResponse>(url, this.httpOptions);
  }
  updateBio(bio: string, userId: number){
    const url = `${BASE_URL}/member/bio/${bio}/user/${userId}`;
    return this.httpClient.post<UserProfileResponse>(url, this.httpOptions);
  }
}
