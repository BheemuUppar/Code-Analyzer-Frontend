import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  @Output() apiResponse = new EventEmitter<any>()

  constructor(private apiService: ApiService) {}
  onDragOver(event: DragEvent) {
    event.preventDefault();
    console.log('OVER ', event);
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    console.log('LEAVE ', event);
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;

    const items = event.dataTransfer?.items;
    const files = event.dataTransfer?.files;

    console.log('}Dropped Items:', items);
    console.log('Dropped Files:', files);

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

  onFileUpload() {
    if (this.file) {
      const formData: any = new FormData();
      formData.append('zipFile', this.file); // File from file input

      this.apiService
        .analyzeCode(this.file, this.githubUrl)
        .subscribe((res: any) => {
          this.file = null;
          this.githubUrl = null;
          //  this.codeAnalysis = res?.codeAnalysis;
          //  this.projectMetaData = res?.projectMetaData;
          this.apiResponse.emit(res)
        });
    } else if (this.githubUrl) {
      this.apiService
        .analyzeCode(this.file, this.githubUrl)
        .subscribe((res: any) => {
          this.file = null;
          this.githubUrl = null;
          //  this.codeAnalysis = res?.codeAnalysis;
          //  this.projectMetaData = res?.projectMetaData;
          console.log(res)
          this.apiResponse.emit(res)
        });
    } else {
      alert('There is no File/Url Found');
    }
  }
}
