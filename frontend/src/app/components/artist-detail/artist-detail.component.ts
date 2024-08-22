import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Artist} from "../../beans/artist";
import {ActivatedRoute} from "@angular/router";
import {ArtistService} from "../../services/artist.service";

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss']
})
export class ArtistDetailComponent implements OnInit{

  error_message: string = "";
  sub!: Subscription;

  artist!: Artist;
  artist_id: string = '';

constructor(private artistService: ArtistService,
            private route: ActivatedRoute) { }


  ngOnInit() {
    this.route.paramMap.subscribe({
      next: params => {
        if (params.has('id')) {
          let idArtist = params.get('id');
          if (idArtist != null) {
            this.artist_id = idArtist;
          }
        }
      },
      error: err => this.error_message = err
    });
    this.set_artist();
  }

  private set_artist(): void{
    this.sub = this.artistService.get_by_id(this.artist_id).subscribe({
      next: artist => {
        this.artist = artist;
      },
      error: err => this.error_message = err
    })
  }
}

