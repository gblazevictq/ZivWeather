import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  gradientOutput = '';

  constructor(public stateSvc: StateService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.stateSvc.averageTemperature.subscribe((avgTmp) => {
      const thisRef = this;
      Promise.resolve().then(() => {
        const calc = thisRef.stateSvc.calculateGradient(avgTmp);
        thisRef.gradientOutput = calc;
        thisRef.cd.detectChanges();
      });
    });
  }
}
