import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IWeatherCity } from '../models/weather-city.interface';
import { IWeatherForecast } from '../models/weather-forecast.interface';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private WEATHER_API = 'http://api.weatherbit.io/v2.0/';

  constructor(private http: HttpClient) {}

  getForecast(city: IWeatherCity): Observable<IWeatherForecast> {
    return this.http.get<IWeatherForecast>(
      `${this.WEATHER_API}forecast/daily?lat=${city.lat}&lon=${city.lon}&days=7&key=${environment.weatherbitAPIkey}`
    );
  }
}
