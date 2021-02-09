import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICity } from 'country-state-city';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private weatherAPIKey: string;

  constructor(private http: HttpClient) {
    this.weatherAPIKey = environment.weatherbitAPIkey;
  }

  getForecast(city: ICity): void {
    console.log('getting forecast for ', city);
  }
}
