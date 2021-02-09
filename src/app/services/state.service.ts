import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IWeatherCity } from '../models/weather-city.interface';
import { IWeatherCountry } from '../models/weather-country.interface';
import { IWeatherForecast } from '../models/weather-forecast.interface';
import { WeatherService } from './weather.service';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  selectedCity: BehaviorSubject<IWeatherCity> = new BehaviorSubject(null);
  selectedCountry: BehaviorSubject<IWeatherCountry> = new BehaviorSubject(null);
  retrievedForecast: BehaviorSubject<IWeatherForecast> = new BehaviorSubject(
    null
  );
  averageTemperature: BehaviorSubject<number> = new BehaviorSubject(null);

  constructor(private weatherSvc: WeatherService) {
    this.selectedCity.subscribe((city) => {
      if (city !== null) {
        this.weatherSvc.getForecast(city).subscribe({
          next: (cityForecast) => {
            this.retrievedForecast.next(cityForecast);
          },
          error: () => {
            alert('Error retrieving forecast.');
          },
        });
      }
    });
  }
}
