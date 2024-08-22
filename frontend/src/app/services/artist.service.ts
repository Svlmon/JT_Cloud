import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UrlService} from "./url.service";
import {catchError, Observable, tap} from "rxjs";
import {Artist} from "../beans/artist";

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(
    private readonly http: HttpClient,
    private readonly url_service: UrlService
  ) { }

  get_by_id(id: string): Observable<Artist>{
    let url_replace = this.url_service.get_artists_routes().get_artists_by_id.replace('{id}', id);
    return this.http.get<Artist>(url_replace)
      .pipe(
        tap(data => console.log('Artist', JSON.stringify(data))),
        catchError(this.url_service.handle_error)
      );
  }
}
