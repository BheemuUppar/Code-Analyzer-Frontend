import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket !: Socket;
   severityOrder :any = {
  Critical: 1,
  High: 2,
  Medium: 3,
  Low: 4
};

  constructor(private apiService:ApiService) {
  this.initializeConnection();
  }

initializeConnection(){
  this.socket = io('http://localhost:3000',  // your backend URL
    {
 });
  this.socket.on('connect', ()=>{
    alert("socket connected...");
    
  })
  
  this.socket.on('status-update', (data)=>{
      this.apiService.currentStatus = data.status
    console.log(data.status)
  })

    this.socket.on('completed', (data)=>{
      this.apiService.codeAnalysis = data.data.codeAnalysis.sort((a:any, b:any) => {
        return this.severityOrder[a.severity] - this.severityOrder[b.severity];
      });
      this.apiService.currentStatus = undefined;
    this.apiService.projectMetaData = data.data.projectMetaData;

  })
  

}
 



  // Send jobId to register with backend
  registerJob(jobId: string) {
    this.socket.emit('register-job', { jobId:jobId });
  }

  // Listen for job status updates
  onJobStatus(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('job-status', (data) => {
        observer.next(data);
      });
    });
  }

  disconnect() {
    this.socket.disconnect();
  }
}
