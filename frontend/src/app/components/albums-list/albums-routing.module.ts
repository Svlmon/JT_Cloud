import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AlbumDetailComponent} from "../album-detail/album-detail.component";


const routes: Routes = [
  {
    path: 'albums',
    children: [
      {path: ':id', component: AlbumDetailComponent, pathMatch: 'full'}
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AlbumsRoutingModule {
}
