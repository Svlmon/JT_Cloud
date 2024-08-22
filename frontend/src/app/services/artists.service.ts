import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Artist} from "../beans/artist";
import {UrlService} from "./url.service";
import {catchError, Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {

  constructor(
    private readonly http: HttpClient,
    private readonly url_service: UrlService
  ) { }

  get_artists(): Observable<Artist[]>{
    return this.http.get<Artist[]>(this.url_service.get_artists_routes().get_artists)
      .pipe(
        tap(data => console.log('Artists', JSON.stringify(data))),
        catchError(this.url_service.handle_error)
      );
  }
}
