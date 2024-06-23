import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-synopsis',
  standalone: true,
  imports: [],
  templateUrl: './synopsis.component.html',
  styleUrl: './synopsis.component.scss'
})
export class SynopsisComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)  
    public data: { 
    Description: string;
    }
  ){}
}
