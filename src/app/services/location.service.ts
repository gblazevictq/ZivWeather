import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWeatherCity } from '../models/weather-city.interface';
import { IWeatherCountry } from '../models/weather-country.interface';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) {}

  getCountries(): Observable<IWeatherCountry[]> {
    return this.http.get<IWeatherCountry[]>(
      'assets/location-data/countries.json'
    );
  }

  getCities(): Observable<IWeatherCity[]> {
    return this.http.get<IWeatherCity[]>('assets/location-data/cities.json');
  }
}
