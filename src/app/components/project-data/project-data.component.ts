import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-project-data',
  imports: [CommonModule],
  templateUrl: './project-data.component.html',
  styleUrl: './project-data.component.css'
})
export class ProjectDataComponent {
 constructor(public service:ApiService){}
}
