import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-dialog',
  templateUrl: './genre-dialog.component.html',
  styleUrls: ['./genre-dialog.component.scss']
})
export class GenreDialogComponent {
    /**
   * constructs a movie genre injecting data specific to each genre for every instance.
   * @param data 
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data : {
      Name : string,
      Description: string
    }
  ){}

}
