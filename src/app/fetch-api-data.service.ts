import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators/catchError'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = "https://scenestealer.herokuapp.com/"
@Injectable({
  providedIn: 'root'
})



export class FetchApiDataService {
  constructor(private http: HttpClient) { } // HTTPClient placed on the instance and accessed through 'http'. 
  /**
   * function for posting new user to /users api endoint. 
   * @param user 
   * 
   */
  public userRegistrationDetails(user: any): Observable<any> {
    console.log(user);
    return this.http.post(apiUrl + 'users', user, {
      headers: new HttpHeaders(
        {
          "Content-Type": "application/json"
        }
      )
    }).pipe(
      catchError(this.handleError)
    )
  }

  /**
   * function for posting login data to /login api endpoint. 
   * @param user 
   * @returns 
   */
  public userLogin(user: any): Observable<any> {
    return this.http.post(apiUrl + 'login', user, {
      headers: new HttpHeaders(
        {
          "Content-Type": "application/json"
        }
      )
    }).pipe(
      catchError(this.handleError)
    )
  }
  /**
   * function that appends movieID to user favorites, user matched via username in url param.
   * @param movieID 
   * @param username 
   * @returns 
   */
  addFavorite(movieID: string, username: string) : Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(`${apiUrl}users/${username}/favorites/${movieID}`,{content: 'application/json'}, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }
    /**
   * function that removes movieID from user favorites, user matched via username in url param.
   * @param movieID 
   * @param username 
   * @returns 
   */
  removeFavorite(movieID: string, username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(`${apiUrl}users/${username}/favorites/${movieID}`,{content: 'application/json' }, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }
  /**
   * function for accessing user's array of favorites from the db.
   * @param userName 
   * @returns 
   */
  getFavorites(userName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}users/${userName}`, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }
  /**
   * function for putting new user data onto the user object within the db via form data. 
   * @param userName 
   * @param newUser 
   * @returns 
   */
  editUser(userName: string, newUser: {}): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(`${apiUrl}users/${userName}`, newUser, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }
  /**
   * function for delete request of specific user from database.
   * @param userName 
   * @returns 
   */
  deleteUser(userName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(`${apiUrl}users/${userName}`, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }


  // Get's all movies from api /movies endpoint. 
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    console.log(token);
    return this.http.get(`${apiUrl}movies`, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }
  // get single movie object based on movie title. 
  getMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}movies/${title}`, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }
  // get all movie genres from genres endpoint. 
  getAllGenres(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}genres`, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }
  // get single movie genre based on genre name. 
  getGenre(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}genres/${name}`, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }
// get all directors from directors collection. 
  getAllDirectors(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}directors`, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }
  // get single director based on director name in url param. 
  getDirector(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}directors/${name}`, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  // universal function for extracting response body 
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  // universal function for return error responses to http requests. 
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof (ErrorEvent)) {
      console.log('Some error occured', error.message);
    } else {
      console.error(
        `Error status code  ${error.status}, ` +
        `Error body is ${error.error}`
      )
    }
    return throwError(
      'Something went wrong'
    );
  }

}







