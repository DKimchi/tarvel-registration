import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { CarDataService } from 'src/app/services/car-data.service';
import { DataFBService } from 'src/app/services/data-fb.service';
import { carModule } from 'src/app/models/car-module';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user-module';
import { take } from 'rxjs/operators';
import { DeleteConstTripComponent } from '../delete-const-trip/delete-const-trip.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogMessageComponent } from '../dialog-message/dialog-message.component';
import { DomSanitizer } from '@angular/platform-browser';
import { MessagingService } from 'src/app/services/messaging.service';

@Component({
  selector: 'app-main-from',
  templateUrl: './main-from.component.html',
  styleUrls: ['./main-from.component.scss']
})
export class MainFromComponent implements OnInit {
  misholUsher: string;
  message;
  carData: carModule;
  user: User;
  openConstTrips = false;
  dateLastTrip;
  constTrips: Array<object>;
  zavHatnua: string[];
  constructor(
    private dialogDel: MatDialog,
    public dataFBService: DataFBService,
    public carDataService: CarDataService,
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private fcm: MessagingService,
    iconRegistry: MatIconRegistry,

    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'cancel_outline',
      sanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/outline-cancel-24px.svg'
      )
    );
  }


  ngOnInit() {
    this.carDataService.currentCarData.subscribe(val => {
      this.carData = val;
    });
    this.auth.user$.subscribe(val => {
      this.user = val;
      this.constTrips = val.constTrips;
      // tslint:disable-next-line: no-shadowed-variable
      this.dataFBService.getGeneralDataFormFB().subscribe(val => {
        this.misholUsher = val['misholUsher'];
        if (this.user['displayName'] === this.misholUsher) {
          this.fcm.requestPermission();
          this.fcm.receiveMessage();
          this.message = this.fcm.currentMessage;
        }
        this.zavHatnua = val['zavHatnua'];
        if (this.zavHatnua.includes(this.user['displayName'])) {
          this.fcm.requestPermission();
          this.fcm.receiveMessage();
          this.message = this.fcm.currentMessage;
        }
      });
      console.log(this.constTrips);
    });

  }
  startCurrentTrip() {
    const { collectionOfCar, name } = this.carData;
    console.log(collectionOfCar, name);
    if (collectionOfCar !== '' && name !== '') {
      if (this.carData.currentTrip['startKM'] === null) {
        this.snackBar.open('חסר ק"מ פתיחה', '', {
          verticalPosition: 'top',
          duration: 2000
        });
        console.log('חסר ק"מ פתיחה');
        // TODO: להוסיף התראה על חסר ק"מ פתיחה
      } else {
        this.dataFBService.updataCarData(collectionOfCar, name, this.carData);
        if (this.carData['currentTrip']['driver']['name'] === '') {
          this.carData.openRegistration = null;
          this.carDataService.startTripBtnText = 'התחלת נסיעה';
        } else {
          this.carDataService.startTripBtnText =
            'נסיעה החלה - לחץ כדי לשנות פרטים';
          if (this.carData.openRegistration === null) {
            this.carData.openRegistration = new Date();
          }
        }
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
    this.carDataService.changeTextName();
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

  removeRepCar() {
    const dialogRemoveRepCar = this.dialogDel.open(DialogMessageComponent, {
      maxWidth: 400,
      data: {
        endTripData: '',
        messageName: 'returnRepCar',
        displayName: this.carData.displayName
      },
      autoFocus: false

      // TODO: חזרה אחורה בטלפון תסגור את הדיאלוג
    });
    dialogRemoveRepCar
      .afterClosed()
      .pipe(take(1))
      .subscribe(val => {
        if (val) {
          this.carDataService.removeRepCar();
        }
      });
  }
}
