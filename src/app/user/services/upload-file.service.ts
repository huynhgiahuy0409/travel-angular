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
  constructor(private http: HttpClient) {}
  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${BASE_URL}/public/upload`, formData, {
      reportProgress: true,
      responseType: 'json',
    });
    return this.http.request(req);
  }
  getFiles(): Observable<any> {
    return this.http.get(`${BASE_URL}/public/files`);
  }
  showImage() {
    return this.http.get(`${BASE_URL}/public/filename`, this.httpOptions);
  }
  getFile() {
    const httpParams = new HttpParams().set(
      'filename',
      'video-1650252391-1651060200520-1651980799675.mp4'
    );
    return this.http.get(`${BASE_URL}/public/filename`, {
      responseType: 'blob',
      params: httpParams,
    });
  }
}
