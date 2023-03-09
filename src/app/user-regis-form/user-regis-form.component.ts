import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from "../fetch-api-data.service";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";


@Component({
  selector: 'app-user-regis-form',
  templateUrl: './user-regis-form.component.html',
  styleUrls: ['./user-regis-form.component.scss']
})


export class UserRegisFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegisFormComponent>,
    public snackBar: MatSnackBar) { }

  registerUser(): void {
    this.fetchApiData.userRegistrationDetails(this.userData).subscribe((result) => {
      this.dialogRef.close();
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 2000,
      });
    }, (result) => {
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 2000,
      })
    })
  }


  ngOnInit(): void {
  }

}
