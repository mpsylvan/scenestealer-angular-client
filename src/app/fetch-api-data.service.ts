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

  addFavorite(movieID: string): Observable<any> {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http.post(`${apiUrl}/favorites/${user}/${movieID}`, {
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

  removeFavorite(movieID: string, username: string): Observable<any> {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http.put(`${apiUrl}/favorites//${username}`, {
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

  getFavorites(userName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}/users/${userName}`, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  editUser(userName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(`${apiUrl}/users/${userName}`, {
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

  deleteUser(userName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(`${apiUrl}/users/${userName}`, {
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


  // Get requests
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


  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }


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







