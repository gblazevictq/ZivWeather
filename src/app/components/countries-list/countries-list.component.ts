import { Component, OnInit } from '@angular/core';
import { ICountry } from 'country-state-city';
import { LocationService } from '../../services/location.service';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss'],
})
export class CountriesListComponent implements OnInit {
  countries: ICountry[] = [];
  countrySelectorHidden = true;

  constructor(private locSvc: LocationService, public stateSvc: StateService) {}

  ngOnInit(): void {
    this.locSvc.getCountries().subscribe({
      next: (countries) => {
        this.countries = countries.sort((a, b) =>
          a.isoCode > b.isoCode ? 1 : -1
        );
        this.stateSvc.selectedCountry.next(this.countries[0]);
      },
      error: () => {
        alert('Error retrieving countries.');
      },
    });
  }

  selectCountry(country: ICountry): void {
    this.stateSvc.selectedCountry.next(country);
    this.stateSvc.selectedCity.next(null);
  }

  countryNameSterilize(input: string): string {
    return input.replace(/\s+/g, '-');
  }
}
