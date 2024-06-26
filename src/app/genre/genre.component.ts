import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-genre',
  standalone: true,
  imports: [],
  templateUrl: './genre.component.html',
  styleUrl: './genre.component.scss'
})
export class GenreComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)  
    public data: { 
    Name: string; 
    Description: string;
    }
  ){}
  
}
