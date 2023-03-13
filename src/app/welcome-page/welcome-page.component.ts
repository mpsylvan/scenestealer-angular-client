import { Component, OnInit } from '@angular/core';
import { UserRegisFormComponent } from '../user-regis-form/user-regis-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';


import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private router: Router) { }
  ngOnInit(): void {
  }
  // This is the function that will open the dialog when the signup button is clicked  
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegisFormComponent, {
      // Assigning the dialog a width
      width: '280px'
    });
  }

  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }


  goToProfile(): void {
    this.router.navigate(['profile'])
  }


}