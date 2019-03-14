import { Component, OnInit } from '@angular/core';

import { CarDataService } from 'src/app/services/car-data.service';
import { DataFBService } from 'src/app/services/data-fb.service';
import { carModule } from 'src/app/models/car-module';

@Component({
  selector: 'app-main-from',
  templateUrl: './main-from.component.html',
  styleUrls: ['./main-from.component.scss']
})
export class MainFromComponent implements OnInit {
  startTripBtnText = 'התחלת נסיעה';
  carData: carModule;

  constructor(
    public dataFBService: DataFBService,
    public carDataService: CarDataService
  ) {}

  ngOnInit() {
    this.carDataService.currentCarData.subscribe(val => {
      this.carData = val;
    });
  }

  startCurrentTrip() {
    const { collectionOfCar, name } = this.carData;
    if (collectionOfCar != '' && name != '') {
      if (this.carData.currentTrip['startKM'] === null) {
        console.log('חסר ק"מ פתיחה');
        //TODO: להוסיף התראה על חסר ק"מ פתיחה
      } else {
        this.dataFBService.updataCarData(collectionOfCar, name, this.carData);
      }
    } else {
      console.log('לא נבחר רכב');
      //TODO: לסדר התראה על זה שלא נבחר רכב.
    }
  }
}
