import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UrlService} from "./url.service";
import {BehaviorSubject, catchError, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private is_auth: boolean = false;
  private is_authenticated_subject = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly http: HttpClient,
    private readonly url_service: UrlService
  ) {
  }

  login(email: string, password: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<any>(this.url_service.get_users_routes().post_user_login, {
      email,
      password
    }, httpOptions)
      .pipe(
        tap(data => this.is_auth = true),
        catchError(this.url_service.handle_error)
      );
  }

  set_auth(value: boolean){
    this.is_authenticated_subject.next(value);
  }

  get_auth(){
    return this.is_authenticated_subject.asObservable();
  }
}
