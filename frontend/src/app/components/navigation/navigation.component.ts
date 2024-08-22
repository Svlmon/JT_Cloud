import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  is_auth: boolean = false;

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.authService.get_auth().subscribe(auth => {
      this.is_auth = auth;
    });
  }

}
