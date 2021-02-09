import { Component, OnInit } from '@angular/core';
import { ICountry } from 'country-state-city';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss'],
})
export class CountriesListComponent implements OnInit {
  countries: ICountry[] = [];
  selectedCountry: ICountry;

  constructor(private locSvc: LocationService) {}

  ngOnInit(): void {
    this.locSvc.getCountries().subscribe({
      next: (countries) => {
        this.countries = countries;
        this.selectedCountry = countries[0];
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }

  countryNameSterilize(input: string): string {
    return input.replace(/\s+/g, '-');
  }
}
