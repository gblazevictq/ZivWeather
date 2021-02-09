import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICountry } from 'country-state-city';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) {}

  getCountries(): Observable<ICountry[]> {
    return this.http.get<ICountry[]>('assets/country-state-city/country.json');
  }
}
