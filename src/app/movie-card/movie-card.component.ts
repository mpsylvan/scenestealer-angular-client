import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from "../fetch-api-data.service";

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {

  movies: any[] = [];

  constructor(public fetchMovies: FetchApiDataService) { };


  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchMovies.getAllMovies().subscribe((response) => {
      this.movies = response;
      console.log(this.movies);
      return this.movies;
    })
  }

}
