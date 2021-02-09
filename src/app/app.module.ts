import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CityInputComponent } from './components/city-input/city-input.component';
import { CountriesListComponent } from './components/countries-list/countries-list.component';
import { WeatherLookupComponent } from './components/weather-lookup/weather-lookup.component';
import { WeatherComponent } from './pages/weather/weather.component';
import { WeatherStateComponent } from './components/weather-state/weather-state.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherLookupComponent,
    WeatherComponent,
    CountriesListComponent,
    CityInputComponent,
    WeatherStateComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
