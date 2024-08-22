import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  is_logout: boolean = false;

  constructor(
    private readonly auth_service: AuthenticationService,
    private readonly router: Router
  ) {
  }

  ngOnInit() {
    let jwt = localStorage.getItem('jwt');
    if (jwt){
      localStorage.removeItem('jwt');
      this.auth_service.set_auth(false);
      this.is_logout = true;
    }
    this.router.navigate(["/home"])
  }
}
