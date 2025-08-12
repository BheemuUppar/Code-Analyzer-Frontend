import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-upload',
  imports: [CommonModule, FormsModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css',
})
export class UploadComponent {
  isDragging = false;
  file: File | null = null;
  githubUrl: string | null = null;
  @ViewChild('fileInputRef') fileInputRef!: ElementRef<HTMLInputElement>;

  @Output() apiResponse = new EventEmitter<any>()

  constructor(private apiService: ApiService, private socketService:SocketService) {}
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;

    const items = event.dataTransfer?.items;
    const files = event.dataTransfer?.files;


    if (files && files.length > 0) {
      this.file = files[0];
    } else {
      console.warn('No files found in drop event');
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.file = input.files[0];
    }
  }
 triggerFileSelect() {
    this.fileInputRef.nativeElement.click();
  }
  onFileUpload() {
    

    if (this.file) {
      const formData: any = new FormData();
      formData.append('zipFile', this.file); // File from file input

      this.apiService
        .analyzeCode(this.file, this.githubUrl)
        .subscribe((res: any) => {
          this.file = null;
          this.githubUrl = null;
           this.apiService.codeAnalysis = [];
            this.apiService.projectMetaData = undefined;
          //  this.codeAnalysis = res?.codeAnalysis;
          //  this.projectMetaData = res?.projectMetaData;
          this.socketService.registerJob(res.id)
          // this.apiResponse.emit(res)
        });
    } else if (this.githubUrl) {
      this.apiService
        .analyzeCode(this.file, this.githubUrl)
        .subscribe((res: any) => {
          this.file = null;
          this.githubUrl = null;
           this.apiService.codeAnalysis = [];
          this.apiService.projectMetaData = undefined;
          //  this.codeAnalysis = res?.codeAnalysis;
          //  this.projectMetaData = res?.projectMetaData;
          this.socketService.registerJob(res.id);
          // this.apiResponse.emit(res)
        });
    } else {
      alert('There is no File/Url Found');
    }
   
  }

  clear(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.file = null;
    this.githubUrl = null;
    this.fileInputRef.nativeElement.value = '';
  }
}
