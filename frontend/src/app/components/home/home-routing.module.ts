import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home.component";
import {NgModule} from "@angular/core";


const routes: Routes = [
  {
    path: 'home',
    children: [
      {path: '', component: HomeComponent, pathMatch: 'full'}
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
