import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherLookupComponent } from './components/weather-lookup/weather-lookup.component';
import { WeatherComponent } from './pages/weather/weather.component';
import { CountriesListComponent } from './components/countries-list/countries-list.component';

@NgModule({
  declarations: [AppComponent, WeatherLookupComponent, WeatherComponent, CountriesListComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
