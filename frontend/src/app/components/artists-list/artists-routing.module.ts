import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ArtistDetailComponent} from "../artist-detail/artist-detail.component";


const routes: Routes = [
  {
    path: 'artists',
    children: [
      {path: ':id', component: ArtistDetailComponent, pathMatch: 'full'}
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ArtistsRoutingModule {
}
