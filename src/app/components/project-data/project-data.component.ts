import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-project-data',
  imports: [CommonModule],
  templateUrl: './project-data.component.html',
  styleUrl: './project-data.component.css'
})
export class ProjectDataComponent {
 @Input() projectMetaData :any = undefined
}
