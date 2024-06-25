import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://movie-api-vudt.onrender.com/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  constructor(private http: HttpClient) {
  }

  /**
    * create new user
    * @param {Object} userDetails must include username, password and password. Optional: birthday
    * @returns 
  */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  /**
    * login
    * @param {Object} userDetails must include username and password
    * @returns 
  */
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  /**
    * get all movies
    * @returns if token is false, status 401 & text "unauthorized", else return array of movie object
  */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  private extractResponseData(res: Object): any {
    const body = res;
    return body || {};
  }

  /**
    * get movie with title
    * @param {string} title Movie's title
    * @returns if token is false, status 401 & text "unauthorized". if movie exists, status 200 & movie object. if movie doesn't exist, status 400 & text "No such movie"
  */
  getOneMovies(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
    * get director with name
    * @param {string} directorName 
    * @returns if token is false, status 401 & text "unauthorized". if director exists, status 200 & director object. if director doesn't exist, status 400 & text "No such director"
  */
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/directors/:Name', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  /**
    * get genre with name
    * @param {string} genre
    * @returns if token is false, status 401 & text "unauthorized". if genre exists, status 200 & genre object. if genre doesn't exist, status 400 & text "No such genre"
  */
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/:Name', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
    * get all user
    * @returns if token is false, status 401 & text "unauthorized", else return array of user objects
  */
  getUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user;
  }

  getFavouriteMovies(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + username, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      //map((data) => data.FavoriteMovies),
      catchError(this.handleError)
    );
  }

  /**
    * add movie to user's favorite list
    * @param userID 
    * @param title movie's title
    * @returns if token is false, status 401 & text "unauthorized". if add movie success, status 200 & user object. if movie doesn't exist, status 400 & text "No such movie"
  */
  addFavouriteMovies( movie: any ): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    console.log('in fetch api service: ', movie);
    console.log('in fetch api service_id: ', movie._id);
    return this.http.post(apiUrl + 'users/' + user.Username + '/movies/' + movie._id, null, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
    * change user's details
    * @param userDetails must include all the fields of user object
    * @returns if token is false, status 401 & text "unauthorized". if update user's details success, status 200 & user object.
  */
  editUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + userDetails.Username, userDetails, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
    * delete user
    * @param userID 
    * @returns if token is false, status 401 & text "unauthorized". if delete user success, status 200 & text "${username} was deleted"
  */
  deleteUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + user.Username, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
    * delete a movie from user's favorite list
    * @param userID 
    * @param title 
    * @returns if token is false, status 401 & text "unauthorized". if delete movie success, status 200 & user object.
  */
  deleteFavouriteMovies(movie: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    console.log('in fetch api service: ', movie._id);
    return this.http.delete(apiUrl + 'users/' + user.Username + '/movies/' + movie._id, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}