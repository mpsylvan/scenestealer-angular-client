import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-dialog',
  templateUrl: './director-dialog.component.html',
  styleUrls: ['./director-dialog.component.scss']
})
export class DirectorDialogComponent {
  /**
   * constructs a director dialog injecting data specific to each director for every instance.
   * @param data 
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data : {
      Name : string,
      Bio: string,
      Nationality: string
    }
  ){}

}
