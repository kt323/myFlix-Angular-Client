import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-director',
  standalone: true,
  imports: [],
  templateUrl: './director.component.html',
  styleUrl: './director.component.scss'
})
export class DirectorComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)  
    public data: { 
    Name: string; 
    Bio: string;
    Birth: string
    }
  ){}
}
