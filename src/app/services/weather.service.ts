import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private weatherAPIKey: string;

  constructor(private http: HttpClient) {
    this.weatherAPIKey = environment.weatherbitAPIkey;
  }
}
