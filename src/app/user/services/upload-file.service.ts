import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BASE_URL } from 'src/app/shared/models/constant';
import { APIResponse, FilterFileUpload } from 'src/app/shared/models/model';
import { UploadFileResponse } from 'src/app/shared/models/response';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    params: {},
  };
  constructor(private httpClient: HttpClient) {}
  multipleUpload(files: File[]): Observable<APIResponse<UploadFileResponse[]>> {
    let url = `${BASE_URL}/member/users/me/files`;
    const formData: FormData = new FormData();
    files.forEach((file) => {
      formData.append('file', file);
    });
    return this.httpClient.post<APIResponse<UploadFileResponse[]>>(
      url,
      formData,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );
  }
  uploadAvatar(file: File): Observable<UploadFileResponse> {
    let url = `${BASE_URL}/member/users/me/avt`;
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<UploadFileResponse>(url, formData, {
      reportProgress: true,
      responseType: 'json',
    });
  }

  uploadCoverImage(file: File): Observable<UploadFileResponse> {
    let url = `${BASE_URL}/member/users/me/cover-image`;
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<UploadFileResponse>(url, formData, {
      reportProgress: true,
      responseType: 'json',
    });
  }
  /* Gỡ nhưng không xóa */
  removedCoverImage(userId: number) {
    let url = `${BASE_URL}/member/user/${userId}/removed/cover-image`;
    return this.httpClient.get<Boolean>(url, this.httpOptions);
  }

  upload(file: File): Observable<APIResponse<UploadFileResponse>> {
    let url = `${BASE_URL}/member/users/me/files`;
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<APIResponse<UploadFileResponse>>(
      url,
      formData,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );
  }
  findAll(filter: FilterFileUpload) {
    const url = `${BASE_URL}/member/files`;
    let params = new HttpParams();
    if (filter.pageable) {
      params = params.append('pageIndex', filter.pageable.pageIndex);
      params = params.append('pageSize', filter.pageable.pageSize);
    }
    if (filter.pageable && filter.pageable.sortable) {
      params = params.append('dir', filter.pageable.sortable.dir);
      params = params.append('order', filter.pageable.sortable.order);
    }
    if(filter.userId){
      params = params.append('userId', filter.userId);
    }
    if(filter.specie){
      params = params.append('specie', filter.specie);
    }
    let httpOptions = {
      headers: this.httpOptions.headers,
      params: params,
    };

    return this.httpClient.get<UploadFileResponse[]>(url, httpOptions);
  }
}
