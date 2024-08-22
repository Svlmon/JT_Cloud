import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  artists: boolean = true;

  btn_artists: any;
  btn_albums: any;

  constructor() {
  }

  ngOnInit() {
    this.btn_artists = document.getElementById('btn-artists');
    this.btn_albums = document.getElementById('btn-albums');
    this.click_artists(true);
  }

  public click_artists(is_init: boolean = false){
    if (!this.artists || is_init){
      if (this.btn_artists && this.btn_albums){
        this.artists = true;
        this.btn_artists.classList.add('active');
        this.btn_albums.classList.remove('active');
      }
    }
  }

  public click_albums(){
    if (this.artists){
      if (this.btn_artists && this.btn_albums){
        this.artists = false;
        this.btn_artists.classList.remove('active');
        this.btn_albums.classList.add('active');
      }
    }
  }
}
