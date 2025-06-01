import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  imports: [  FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Code Analyser';

 constructor(private http:HttpClient){
this.http.post('http://localhost:3000/analysCode/remoteRepo', {url:'https://github.com/BheemuUppar/chat-application-server.git'}).subscribe((res)=>{
  console.log(res)
})
 }
  onFileUpload(event:any){
   let selectedZipFile = event.target.files[0];
   const formData = new FormData();
   formData.append('zipFile', selectedZipFile); // File from file input
   console.log(formData);

   this.http.post('http://localhost:3000/analysCode/zipFile', formData).subscribe((res)=>{
    console.log(res)
   })
  }


  
}
