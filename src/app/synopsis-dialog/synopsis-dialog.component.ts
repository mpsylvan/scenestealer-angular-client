import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis-dialog',
  templateUrl: './synopsis-dialog.component.html',
  styleUrls: ['./synopsis-dialog.component.scss']
})
    /**
   * constructs a movie synopsis component injecting data specific to each movie synopsis on every instance.
   * @param data 
   */
export class SynopsisDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data : {
      Name : string,
      Synopsis: string
    }
  ){}

}
