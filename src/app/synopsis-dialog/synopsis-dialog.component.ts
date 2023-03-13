import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis-dialog',
  templateUrl: './synopsis-dialog.component.html',
  styleUrls: ['./synopsis-dialog.component.scss']
})
export class SynopsisDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data : {
      Name : string,
      Synopsis: string
      MikesReview: string
    }
  ){}

}
