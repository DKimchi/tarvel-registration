import { Component, OnInit } from '@angular/core';

import { CarDataService } from 'src/app/services/car-data.service';
import { carModule } from 'src/app/models/car-module';

@Component({
  selector: 'app-start-km',
  templateUrl: './start-km.component.html',
  styleUrls: ['./start-km.component.scss']
})
export class StartKmComponent implements OnInit {
  carData: carModule;
  constructor(public carDataService: CarDataService) {}

  ngOnInit() {
    this.carDataService.currentCarData.subscribe(val => {
      this.carData = val;
    });
  }

  readLastTrip() {
    // this.carDataService.resetCarData();
    console.log(this.carData);
  }
}
