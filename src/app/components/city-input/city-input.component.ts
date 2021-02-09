import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { IWeatherCity } from '../../models/weather-city.interface';
import { IWeatherCountry } from '../../models/weather-country.interface';
import { LocationService } from '../../services/location.service';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-city-input',
  templateUrl: './city-input.component.html',
  styleUrls: ['./city-input.component.scss'],
})
export class CityInputComponent implements OnInit {
  allCountryCities: IWeatherCity[] = [];
  filteredCountryCities: IWeatherCity[] = [];
  citySearchValue = '';
  citySearched: Subject<string> = new Subject();

  constructor(
    private locSvc: LocationService,
    private stateSvc: StateService
  ) {}

  ngOnInit(): void {
    this.stateSvc.selectedCountry.subscribe((country) => {
      this.stateSvc.selectedCity.next(null);
      this.loadCitiesByCountry(country);
    });
    this.citySearched.pipe(debounceTime(300)).subscribe(() => {
      this.stateSvc.selectedCity.next(null);
      this.stateSvc.retrievedForecast.next(null);
      this.filterCities();
    });
  }

  loadCitiesByCountry(country: IWeatherCountry): void {
    if (country !== null) {
      this.locSvc.getCities().subscribe({
        next: (cities) => {
          this.allCountryCities = cities.filter(
            (city) => city.country_code === country.country_code
          );
        },
        error: () => {
          alert('Error retrieving cities.');
        },
      });
    } else {
      this.allCountryCities = [];
      this.filteredCountryCities = [];
    }
  }

  searchCities(): void {
    this.citySearched.next();
  }

  filterCities(): void {
    this.filteredCountryCities = this.allCountryCities.filter(
      (city) =>
        city.city_name
          .toLowerCase()
          .indexOf(this.citySearchValue.toLowerCase()) > -1
    );
  }

  selectCity(city: IWeatherCity): void {
    this.stateSvc.selectedCity.next(city);
    this.citySearchValue = city.city_name;
    this.filteredCountryCities = [];
  }
}
