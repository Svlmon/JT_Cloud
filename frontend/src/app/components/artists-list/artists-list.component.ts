import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArtistsService} from "../../services/artists.service";
import {Subscription} from "rxjs";
import {Artist} from "../../beans/artist";

@Component({
  selector: 'app-artists-list',
  templateUrl: './artists-list.component.html',
  styleUrls: ['./artists-list.component.scss']
})
export class ArtistsListComponent implements OnInit, OnDestroy{

  error_message: string = "";
  sub!: Subscription;

  artists: Artist[] = [];

  currentArtist!: Artist | null;

  artist_id: number = 0;

  constructor(
    private readonly artists_service: ArtistsService
  ) {
  }

  ngOnInit() {
    this.set_artists();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private set_artists(){
    this.sub = this.artists_service.get_artists().subscribe({
      next: artists => {
        this.artists = artists;
      },
      error: err => this.error_message = err
    });
  }

  setCurrentArtist(artist: Artist) {
    this.currentArtist = null;
    setTimeout(() => {
      this.currentArtist = artist;
    }, 10)
  }
}
