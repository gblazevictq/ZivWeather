import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IWeatherCity } from '../models/weather-city.interface';
import { IWeatherCountry } from '../models/weather-country.interface';
import { IWeatherForecast } from '../models/weather-forecast.interface';
import { WeatherService } from './weather.service';

interface GradientDef {
  min: number;
  max: number;
  color: string;
}

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

  resetCountry(): void {
    this.selectedCountry.next(null);
    this.selectedCity.next(null);
  }

  resetCity(): void {
    this.selectedCity.next(null);
  }

  calculateGradient(avgTmp: number): string {
    const defaultGradientDefinition =
      'linear-gradient(124deg, #102f7e 0%, #0c8dd6 12.5%, #1aa0ec 25%, #60c6ff 37.5%, #9bdbff 50%, #b4deda 62.5%, #ffd66b 75%, #ffc178 87.5%, #fe9255 100%)';
    if (avgTmp === null) {
      return defaultGradientDefinition;
    } else {
      const rangesTemps: GradientDef[] = [
        {
          min: -40,
          max: -31,
          color: '#102f7e',
        },
        {
          min: -30,
          max: -21,
          color: '#0c8dd6',
        },
        {
          min: -20,
          max: -11,
          color: '#1aa0ec',
        },
        {
          min: -10,
          max: -1,
          color: '#60c6ff',
        },
        {
          min: 0,
          max: 0,
          color: '#9bdbff',
        },
        {
          min: 1,
          max: 10,
          color: '#b4deda',
        },
        {
          min: 11,
          max: 20,
          color: '#ffd66b',
        },
        {
          min: 21,
          max: 30,
          color: '#ffc178',
        },
        {
          min: 31,
          max: 40,
          color: '#fe9255',
        },
      ];

      // Finds the index of the end-color range
      const gradIndx = rangesTemps.findIndex((rangeVal) => {
        return rangeVal.min <= avgTmp && rangeVal.max >= avgTmp;
      });

      // If gradIndx isn't found, it means the temperature is higher than 40 or lower than -40
      // If lower than -40, then solid color
      // If higher than 40, default gradient
      if (gradIndx === -1) {
        if (avgTmp <= rangesTemps[0].min) {
          return rangesTemps[0].color;
        } else if (avgTmp >= rangesTemps[rangesTemps.length - 1].max) {
          return defaultGradientDefinition;
        }
      } else {
        const filteredRanges = rangesTemps.slice(0, gradIndx + 1);
        const increment = Math.round(100 / (filteredRanges.length - 1));

        let tmpString = 'linear-gradient(124deg, ';
        filteredRanges.forEach((rangeVal, rangeIndx) => {
          tmpString += rangeVal.color;
          if (rangeIndx === filteredRanges.length - 1) {
            tmpString += ' 100%)';
          } else {
            tmpString += ' ' + (rangeIndx * increment).toString() + '%,';
          }
        });
        return tmpString;
      }
    }
  }
}
