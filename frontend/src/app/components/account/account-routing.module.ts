import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from "./logout/logout.component";

const routes: Routes = [
  {
    path: 'account',
    children: [
      {path: 'login', component: LoginComponent, pathMatch: 'full'},
      {path: 'logout', component: LogoutComponent, pathMatch: 'full'},
      {redirectTo: 'login', path: '', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AccountRoutingModule {
}
