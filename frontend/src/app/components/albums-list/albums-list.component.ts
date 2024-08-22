import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Album} from "../../beans/album";
import {AlbumsService} from "../../services/albums.service";

@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.scss']
})
export class AlbumsListComponent implements OnInit, OnDestroy{

  error_message: string = "";
  sub!: Subscription;

  albums: Album[] = [];

  album_id: number = 0;

  constructor(
    private readonly albums_service: AlbumsService
  ) {
  }

  ngOnInit() {
    this.set_albums();
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  private set_albums(): void{
    this.sub = this.albums_service.get_albums().subscribe({
      next: albums => {
        this.albums = albums;
      },
      error: err => this.error_message = err
    });
  }
}
