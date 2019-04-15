import { Component, OnInit } from '@angular/core';

import { CarDataService } from 'src/app/services/car-data.service';
import { DataFBService } from 'src/app/services/data-fb.service';
import { carModule } from 'src/app/models/car-module';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user-module';
import { take } from 'rxjs/operators';
import { DeleteConstTripComponent } from '../delete-const-trip/delete-const-trip.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-main-from',
  templateUrl: './main-from.component.html',
  styleUrls: ['./main-from.component.scss']
})
export class MainFromComponent implements OnInit {
  startTripBtnText = 'התחלת נסיעה';
  carData: carModule;
  user: User;
  dateLastTrip;
  constTrips: Array<object>;
  constructor(
    private dialogDel: MatDialog,
    public dataFBService: DataFBService,
    public carDataService: CarDataService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.carDataService.currentCarData.subscribe(val => {
      this.carData = val;
    });
    this.auth.user$.subscribe(val => {
      this.user = val;
      this.constTrips = val.constTrips;
      console.log(this.constTrips);
    });
  }

  startCurrentTrip() {
    const { collectionOfCar, name } = this.carData;
    if (collectionOfCar !== '' && name !== '') {
      if (this.carData.currentTrip['startKM'] === null) {
        console.log('חסר ק"מ פתיחה');
        // TODO: להוסיף התראה על חסר ק"מ פתיחה
      } else {
        this.dataFBService.updataCarData(collectionOfCar, name, this.carData);
      }
    } else {
      console.log('לא נבחר רכב');
      // TODO: לסדר התראה על זה שלא נבחר רכב.
    }
  }

  gatConstTrip(constTrip) {
    this.carData['currentTrip']['driver']['name'] = constTrip.driver.name;
    this.carData['currentTrip']['driver']['bill']['nameOfBill'] =
      constTrip.driver.bill.nameOfBill;
    this.carData['currentTrip']['driver']['bill']['paidByOrganization'] =
      constTrip.driver.bill.paidByOrganization;

    for (let i = 2; i < 8; i++) {
      const pasNumber = 'pas' + i;
      this.carData['currentTrip'][pasNumber]['name'] =
        constTrip[pasNumber].name;
      this.carData['currentTrip'][pasNumber]['bill']['nameOfBill'] =
        constTrip[pasNumber].bill.nameOfBill;
      this.carData['currentTrip'][pasNumber]['bill']['paidByOrganization'] =
        constTrip[pasNumber].bill.paidByOrganization;
    }
    this.startCurrentTrip();
  }

  deleteConstTrip(constTrip) {
    const dialogDeleteConstTrip = this.dialogDel.open(
      DeleteConstTripComponent,
      {
        maxWidth: 400,
        data: {
          name: constTrip.name
        },
        autoFocus: false
        // TODO: קריאה של היעדי חיוב עיקריים
      }
    );
  }

  getLastTripDate() {
    if (this.carData.name !== '') {
      const d = this.carData.lastTrip.dateAndTime['toDate']();
      this.dateLastTrip = `${d.getDate()}/${d.getMonth() +
        1}/${d.getFullYear()}`;
      this.dateLastTrip = d.toLocaleDateString('he-IL', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }
}
