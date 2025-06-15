import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../services/api.service';
import { UploadComponent } from '../upload/upload.component';
import { ResultComponent } from '../result/result.component';
import { ProjectDataComponent } from '../project-data/project-data.component';

@Component({
  selector: 'app-main',
  imports: [
    FormsModule,
    UploadComponent,
    ResultComponent,
    ProjectDataComponent,CommonModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  codeAnalysis: any[] = [];
  projectMetaData: any = undefined;

  constructor() {}

  onDataReceive(event: any) {
    this.codeAnalysis = event?.codeAnalysis;
    this.projectMetaData = event?.projectMetaData;
  }
}
