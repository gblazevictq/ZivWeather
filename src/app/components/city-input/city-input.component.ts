import { Component, OnInit } from '@angular/core';
import { ICity, ICountry } from 'country-state-city';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LocationService } from '../../services/location.service';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-city-input',
  templateUrl: './city-input.component.html',
  styleUrls: ['./city-input.component.scss'],
})
export class CityInputComponent implements OnInit {
  allCountryCities: ICity[] = [];
  filteredCountryCities: ICity[] = [];
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
      this.filterCities();
    });
  }

  loadCitiesByCountry(country: ICountry): void {
    if (country !== null) {
      this.locSvc.getCities().subscribe({
        next: (cities) => {
          this.allCountryCities = cities.filter(
            (city) => city.countryCode === country.isoCode
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
        city.name.toLowerCase().indexOf(this.citySearchValue.toLowerCase()) > 0
    );
  }

  selectCity(city: ICity): void {
    this.stateSvc.selectedCity.next(city);
    this.citySearchValue = city.name;
    this.filteredCountryCities = [];

    // run search weather
  }
}
