import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GenreComponent } from '../genre/genre.component';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  user: any = {};
  userData = { Username: '', FavoriteMovies: [] };
  FavoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies()
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Function that will open the dialog when director button is clicked.
   * @param {string} name - Name of the director.
   * @param {string} bio - Biography of the director.
   * @param {string} birth - Birth date of the director.
   * @param {string} death - Death date of the director.
   * @returns Directors name, bio, birth date and death date.
   */
  openDirectorDialog(
    name: string,
    bio: string,
    birth: string,
    death: string
  ): void {
    // this.dialog.open(DirectorInfoComponent, {
    //   data: {
    //     Name: name,
    //     Bio: bio,
    //     Birth: birth,
    //     Death: death,
    //   },
    //   width: '450px',
    // });
    this.fetchApiData.getGenre().subscribe((resp: any) => {
      console.log(resp);
      alert(
        `Director: ${resp.name} \n Bio: ${bio} \n Birth: ${birth} \n Death: ${death}`
      );
    });
  }

  /**
   * Function that will open the dialog when genre button is clicked.
   * @param {string} name - Name of the genre.
   * @param {string} description - Description of the genre.
   * @returns Genre name and discription.
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '450px',
    });
    alert(`Genre: ${name} \n Description: ${description}`);
  }

  /**
   * Function that will open the dialog when synopsis button is clicked
   * @param {string} description - Description of the movie.
   * @returns Description of the movie.
   */
  openSynopsisDialog(description: string): void {
    // this.dialog.open(MovieSynopsisComponent, {
    //   data: {
    //     Description: description,
    //   },
    //   width: '450px',
    // });
    alert(`Description: ${description}`);
  }

  /**
   * Function to get favMovie list.
   * @returns Favorite movies of user.
   */
  getFavMovies(): void {
    this.user = this.fetchApiData.getUser();
    this.userData.FavoriteMovies = this.user.FavoriteMovies;
    this.FavoriteMovies = this.user.FavoriteMovies;
    console.log('Fav Movies in getFavMovie', this.FavoriteMovies);
  }

  /**
   * Function to check if movie is a favorite movie.
   * @param movie  - Movie object to check.
   * @returns {boolean} - Boolean indicating whether the movie is a favorite.
   */
  isFav(movie: any): any {
    const MovieID = movie._id;
    if (this.FavoriteMovies.some((movie) => movie === MovieID)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Function add / delete favMovie by icon button
   * @param {any} movie - Movie to toggle favorite icon for.
   */
  toggleFav(movie: any): void {
    const isFavorite = this.isFav(movie);
    isFavorite ? this.deleteFavMovies(movie) : this.addFavMovies(movie);
  }

  /**
   * Function to add movie to favMovie list
   * @param {any} movie - Movie to add to favorite movies.
   * @returns Message "Movie has been added to your favorites!"
   */
  addFavMovies(movie: any): void {
    this.user = this.fetchApiData.getUser();
    this.userData.Username = this.user.Username;
    this.fetchApiData.addFavouriteMovies(movie).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));
      this.getFavMovies();
      this.snackBar.open('Movie has been added to your favorites!', 'OK', {
        duration: 3000,
      });
    });
  }

  /**
   * Function to delete movie from favMovie list.
   * @param {any} movie - Movie to delete from favorite movies.
   * @returns Message "Movie has been deleted from your favorites!"
   */
  deleteFavMovies(movie: any): void {
    this.user = this.fetchApiData.getUser();
    this.userData.Username = this.user.Username;
    this.fetchApiData.deleteFavouriteMovies(movie).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));
      this.getFavMovies();
      this.snackBar.open('Movie has been deleted from your favorites!', 'OK', {
        duration: 3000,
      });
    });
  }
}
