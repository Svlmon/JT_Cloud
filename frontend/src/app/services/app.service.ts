import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  get_api_url(){
    return environment.api_url.valueOf();
  }
}
