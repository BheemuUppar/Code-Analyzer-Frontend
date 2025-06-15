import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  uploadZip ='http://localhost:3000/analysCode/zipFile';
 remoteUrl = ' http://localhost:3000/analysCode/remoteRepo'
  constructor(private http:HttpClient) { }

  analyzeCode(file: File | null, repoUrl: string | null): Observable<any> {
    const formData = new FormData();

    if (file) {
      formData.append('zipFile', file);
      return this.http.post<any>(this.uploadZip, formData);

    }

    if (repoUrl) {
      return this.http.post<any>(this.remoteUrl, {url:repoUrl});
    }

   return of('')
  }


}
