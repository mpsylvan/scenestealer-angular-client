import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent {

  @Input() userData = { Username: '', Password: '', Email: '', Birthdate: '' };

  constructor(
    private service: FetchApiDataService,
    private snackBar: MatSnackBar,
    private router: Router,
  ){}

  ngOnInit(): void {
    if(this.user.Username === undefined){
      this.router.navigate(['welcome']);
      return;
    }else{
      return;
    }
  }

 
  user = JSON.parse(localStorage.getItem('user') || '{}');
  favoriteMovies = this.user.FavoriteMovies;
  movies = JSON.parse(localStorage.getItem('movies')|| '{}');
  formattedBirthdate = new Date(this.user.Birthdate).toLocaleString();

  


  
  
  /**
   * function containing the edit user service for updating user attributes through form input.
   */
  updateUser(){
    this.service.editUser(this.user.Username, this.userData).subscribe((result)=>{
      console.log(result);
      localStorage.setItem('user', JSON.stringify(result.newUser));
      this.user = result.newUser;
      this.snackBar.open(result.newUser.Username, 'Successfully Updated', {
        duration: 800,
      });
      window.location.reload();
    }, (result)=>{
      console.log(result);
      this.snackBar.open(result.error, 'Unable to update user data', {
        duration: 800,
      })
    })}
    /**
   * function containing a pointo of no return prompt and the delete user service for deregsitering user from db.
   */
    deleteUser(){
      let response = prompt('You are about to deregister account, doing so will log you out of the application and force you to re-register. Type in your username to proceed.')
      if (response !== this.user.Username){
        this.snackBar.open( 'Failed','Username did not match', {
          duration: 1000,
        })
        return;
      }
      this.router.navigate(['welcome']);
      this.service.deleteUser(this.user.Username).subscribe((result)=>{
      this.snackBar.open('User Deleted', undefined, {
          duration: 1000,
        })
      })
      localStorage.clear();
    }
}