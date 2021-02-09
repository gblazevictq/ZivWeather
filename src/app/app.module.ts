import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherLookupComponent } from './components/weather-lookup/weather-lookup.component';
import { WeatherComponent } from './pages/weather/weather.component';

@NgModule({
  declarations: [AppComponent, WeatherLookupComponent, WeatherComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
