import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

 uploadZip = environment.uploadZip;
 remoteUrl = environment.remoteUrl;
  codeAnalysis :any  = [];
  projectMetaData : any = undefined;
   severitydata : {high:number, medium:number, low:number} = {
    high: 0,
    medium: 0,
    low: 0
  }
  currentStatus :string |undefined = undefined;
 
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

  calculateSeverityCounts(issues: any[]): void {
    this.severitydata = { high: 0, medium: 0, low: 0 };

    issues.forEach(issue => {
      if (issue.severity === 'High') {
        this.severitydata.high++;
      } else if (issue.severity === 'Medium') {
        this.severitydata.medium++;
      } else if (issue.severity === 'Low') {
        this.severitydata.low++;
      }
    });
  }

}
