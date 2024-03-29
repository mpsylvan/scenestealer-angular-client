import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from "../fetch-api-data.service";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar }from '@angular/material/snack-bar';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { SynopsisDialogComponent } from '../synopsis-dialog/synopsis-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit{

  movies: any[] = [];
  user = JSON.parse(localStorage.getItem('user') || '{}');
  favoriteMovies = this.user.FavoriteMovies;


  constructor(
    public service: FetchApiDataService, 
    private dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router,
    ) { };

  // when the component renders, check if user is logged in, if not route to welcome screen. 
  ngOnInit(): void {
    if(this.user.Username === undefined){
      this.router.navigate(['welcome']);
      return;
    }else{
      this.getMovies();
    }
  }

  getMovies(): void {
    this.service.getAllMovies().subscribe((response) => {
      this.movies = response;
      localStorage.setItem('movies', JSON.stringify(this.movies));
      console.log(this.movies);
      return this.movies;
    })
  }
  /**
   * function that checks if a movie id is present in user's favorites list and then either adds it or removes it accordingly.
   * @param id 
   * @param title 
   */
  toggleMovieFavorites(id: string, title: string){
    console.log(this.favoriteMovies)
    if(!this.favoriteMovies.includes(id)){
      this.service.addFavorite(id, this.user.Username).subscribe((result) => {
        console.log(result);
        localStorage.setItem('user', JSON.stringify(result.newUser));
        this.favoriteMovies = result.newUser.FavoriteMovies
        this.snackBar.open(title, 'Successfully Added', {
          duration: 800,
        });
        
      }, (result) => {
        console.log(result);
        this.snackBar.open(result.err, 'Unable to Add', {
          duration: 800,
        })
      })
    }else{
      this.service.removeFavorite(id, this.user.Username).subscribe((result)=>{
        console.log(result);
        localStorage.setItem('user', JSON.stringify(result.newUser));
        this.favoriteMovies = result.newUser.FavoriteMovies
        this.snackBar.open(title, 'Successfully Removed', {
          duration: 800,
        });
      }, (result)=>{
        console.log(result);
        this.snackBar.open(result.err, 'Unable to Remove', {
          duration: 800,
        })
      })
    }
    }
  /**
   * function that presents a movie snackbar ui element displaying genre title and description data loaded in when card is created.
   * @param name 
   * @param description 
   */
  openGenreDialog(name: string, description: string): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px'
    dialogConfig.height = "auto"
    dialogConfig.data = {
      Name: name,
      Description: description,
    }


    this.dialog.open(GenreDialogComponent, dialogConfig);
  }
/**
 * function that presents a movie snackbar ui element displaying movie name and plot description data loaded in when card is created.
 * @param name 
 * @param synopsis 
 */
  openSynopsisDialog(name: string, synopsis: string): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.height = 'auto';
    dialogConfig.data = {
      Name: name,
      Synopsis: synopsis,
    };


    this.dialog.open(SynopsisDialogComponent, dialogConfig);
  }

  /**
 * function that presents a movie snackbar ui element displaying movie director data loaded in when card is created.
 * @param name 
 * @param synopsis 
 */
  openDirectorDialog(name: string, bio: string, nationality: string): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.height = 'auto';
    dialogConfig.data = {
      Name: name,
      Bio: bio,
      Nationality: nationality,
    };


    this.dialog.open(DirectorDialogComponent, dialogConfig);
  }


}
