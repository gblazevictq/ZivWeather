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

    const monthOpt = { month: 'long' };
    const startMonth = this.dateStart.toLocaleDateString(undefined, monthOpt);
    const startDay = this.dateStart.getDate().toString();
    const startYear = this.dateStart.getFullYear().toString();
    const endMonth = this.dateEnd.toLocaleDateString(undefined, monthOpt);
    const endDay = this.dateEnd.getDate().toString();
    const endYear = this.dateEnd.getFullYear().toString();

    this.dateString =
      startMonth +
      ' ' +
      startDay +
      ' ' +
      (startYear === endYear ? '' : startYear + ' ') +
      ' - ' +
      (startMonth === endMonth ? '' : endMonth) +
      ' ' +
      endDay +
      ' ' +
      endYear;
  }

  getWeatherData(): void {
    this.weatherData = this.stateSvc.retrievedForecast.value.data.slice(0, 7);
  }

  processDateToDay(datetime: string): string {
    const dt = new Date(datetime);
    const options = { weekday: 'long' };
    return dt.toLocaleDateString(undefined, options);
  }

  processTemp(temp: number): string {
    return Math.round(temp).toString();
  }
}
