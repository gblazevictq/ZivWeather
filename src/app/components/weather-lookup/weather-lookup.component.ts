import { Component, OnInit } from '@angular/core';
import { ICountry } from 'country-state-city';

@Component({
  selector: 'app-weather-lookup',
  templateUrl: './weather-lookup.component.html',
  styleUrls: ['./weather-lookup.component.scss'],
})
export class WeatherLookupComponent implements OnInit {
  selectedCountry: ICountry;

  constructor() {}

  ngOnInit(): void {}
}
