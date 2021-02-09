import { Injectable } from '@angular/core';
import { ICity, ICountry } from 'country-state-city';
import { BehaviorSubject } from 'rxjs';
import { WeatherService } from './weather.service';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  selectedCity: BehaviorSubject<ICity> = new BehaviorSubject(null);
  selectedCountry: BehaviorSubject<ICountry> = new BehaviorSubject(null);

  constructor(private weatherSvc: WeatherService) {
    this.selectedCity.subscribe((city) => {
      if (city !== null) {
        this.weatherSvc.getForecast(city);
      }
    });
  }
}
