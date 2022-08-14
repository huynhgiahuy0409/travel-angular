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
import { APIResponse } from 'src/app/shared/models/model';
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
}
