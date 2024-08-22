import { Injectable } from '@angular/core';
import {AppService} from "./app.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  private api_url = this.app_service.get_api_url();

  private artist_route = {
    get_artists: `${this.api_url}artists`,
    get_artists_by_id: `${this.api_url}artists/{id}`,
    get_artists_song: `${this.api_url}artists/{id}/songs`,
    put_artists: `${this.api_url}artists/{id}`,
    delete_artists: `${this.api_url}artists/{id}`,
  }

  private album_route = {
    get_albums: `${this.api_url}albums`,
    get_album_by_id: `${this.api_url}albums/{id}`,
    get_album_songs_by_id: `${this.api_url}albums/{id}/songs`,
    post_album: `${this.api_url}albums`,
    post_album_songs_by_id: `${this.api_url}albums/{id}/songs`,
    put_album_by_id: `${this.api_url}albums/{id}`,
    delete_album_by_id: `${this.api_url}albums/{id}`,
  }

  private user_route = {
    post_user_login: `${this.api_url}users/login`
  }

  constructor(
    private readonly app_service: AppService
  ) { }

  get_albums_routes(){
    return this.album_route;
  }

  get_artists_routes(){
    return this.artist_route;
  }

  get_users_routes() {
    return this.user_route;
  }

  handle_error(err: HttpErrorResponse): Observable<never>{
    let error_message: string = "";
    if (err.error instanceof ErrorEvent){
      error_message = `Server return code ${err.status}, error message is: ${err.message}`;
    }
    console.error(error_message)
    return throwError(() => error_message);
  }
}
