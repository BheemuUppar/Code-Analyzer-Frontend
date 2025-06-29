import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-result',
  imports: [ CommonModule, MatExpansionModule, MatIconModule,],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent {
 constructor(public service:ApiService){}
}
