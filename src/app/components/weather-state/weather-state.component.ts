import { Component, OnInit } from '@angular/core';
import { IWeatherForecastData } from '../../models/weather-forecast.interface';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-weather-state',
  templateUrl: './weather-state.component.html',
  styleUrls: ['./weather-state.component.scss'],
})
export class WeatherStateComponent implements OnInit {
  dateStart: Date;
  dateEnd: Date;
  dateString = '';

  weatherData: IWeatherForecastData[];

  constructor(public stateSvc: StateService) {}

  ngOnInit(): void {
    this.calcAverageTemp();
    this.getDates();
    this.getWeatherData();
  }

  calcAverageTemp(): void {
    let avgTmp = 0;
    this.stateSvc.retrievedForecast.value.data.forEach((dataElement) => {
      avgTmp += dataElement.temp;
    });
    this.stateSvc.averageTemperature.next(
      Math.round(avgTmp / this.stateSvc.retrievedForecast.value.data.length)
    );
  }

  getDates(): void {
    this.dateStart = new Date(
      this.stateSvc.retrievedForecast.value.data[0].datetime
    );
    this.dateEnd = new Date(
      this.stateSvc.retrievedForecast.value.data[
        this.stateSvc.retrievedForecast.value.data.length - 1
      ].datetime
    );

    this.dateString =
      this.dateStart.getMonth().toString() +
      ' ' +
      this.dateStart.getDay().toString() +
      (this.dateStart.getFullYear() === this.dateEnd.getFullYear())
        ? ''
        : this.dateEnd.getFullYear().toString();
  }

  getWeatherData(): void {
    this.weatherData = this.stateSvc.retrievedForecast.value.data.slice(0, 7);
  }
}
