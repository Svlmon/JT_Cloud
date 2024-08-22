import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'account',
    loadChildren: () => import('./account/account-routing.module').then(a => a.AccountRoutingModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home-routing.module').then(a => a.HomeRoutingModule),
  }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
