import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input
} from '@angular/core';

import { CarDataService } from 'src/app/services/car-data.service';
import { carModule } from 'src/app/models/car-module';

@Component({
  selector: 'app-start-km',
  templateUrl: './start-km.component.html',
  styleUrls: ['./start-km.component.scss']
})
export class StartKmComponent implements OnInit, OnChanges {
  @Input() startKM: number;

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  carData: carModule;
  sidenavConstTrips = false;
  constructor(public carDataService: CarDataService) {}

  ngOnInit() {
    this.carDataService.currentCarData.subscribe(val => {
      this.carData = val;
    });
  }

  // changeStartBtnText() {
  //   // this.carDataService.resetCarData();
  //
  // }
}
