import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherLookupComponent } from './components/weather-lookup/weather-lookup.component';

const routes: Routes = [
  {
    path: '',
    component: WeatherLookupComponent,
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
