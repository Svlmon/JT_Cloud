import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  login_form: FormGroup = this.form_builder.group({
    email: [''],
    password: ['']
  });
  error_message!: string;

  constructor(
    private readonly form_builder: FormBuilder,
    private readonly authentication_service: AuthenticationService,
    private readonly router: Router
  ) {
  }

  submit(): void{
    const email_form = this.login_form.get('email')?.value;
    const password_form = this.login_form.get('password')?.value;
    if (
      email_form &&
      password_form
    ) {
      this.authentication_service.login(email_form, password_form).subscribe({
        next: token => {
          localStorage.setItem('jwt', token);
          this.authentication_service.set_auth(true);
          return this.router.navigate(["/home"])
        },
        error: err => this.error_message = err
      });
    }
  }
}
