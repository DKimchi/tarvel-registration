import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataFBService } from 'src/app/services/data-fb.service';
import { PasPickrComponent } from '../pas-pickr/pas-pickr.component';
import { BillPickrComponent } from '../bill-pickr/bill-pickr.component';
import { take, switchMap, map, elementAt } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { carModule } from 'src/app/models/car-module';
import { CarDataService } from 'src/app/services/car-data.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-new-const-trip',
  templateUrl: './new-const-trip.component.html',
  styleUrls: ['./new-const-trip.component.scss']
})
export class NewConstTripComponent implements OnInit {
  // tslint:disable-next-line:ban-types
  indexConstTrip = -1;
  carData: carModule;
  billNames: {
    driver: [];
    pas2: [];
    pas3: [];
    pas4: [];
    pas5: [];
    pas6: [];
    pas7: [];
    general: [];
  } = {
      driver: null,
      pas2: null,
      pas3: null,
      pas4: null,
      pas5: null,
      pas6: null,
      pas7: null,
      general: null
    };
  pasNames: string[];
  constTrip = {
    name: '',
    driver: {
      name: '',
      bill: {
        paidByOrganization: '',
        nameOfBill: ''
      }
    },
    pas2: {
      name: '',
      bill: {
        paidByOrganization: '',
        nameOfBill: ''
      }
    },
    pas3: {
      name: '',
      bill: {
        paidByOrganization: '',
        nameOfBill: ''
      }
    },
    pas4: {
      name: '',
      bill: {
        paidByOrganization: '',
        nameOfBill: ''
      }
    },
    pas5: {
      name: '',
      bill: {
        paidByOrganization: '',
        nameOfBill: ''
      }
    },
    pas6: {
      name: '',
      bill: {
        paidByOrganization: '',
        nameOfBill: ''
      }
    },
    pas7: {
      name: '',
      bill: {
        paidByOrganization: '',
        nameOfBill: ''
      }
    }
  };
  constructor(
    private dialogPasPickr: MatDialog,
    public auth: AuthService,
    private snackBar: MatSnackBar,
    public dataFBService: DataFBService,
    private router: Router,
    public carDataService: CarDataService,
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
    this.dataFBService.getGeneralDataFormFB().subscribe(val => {
      this.pasNames = val['pasNames'].split(',');
      this.billNames['general'] = val['arrBillNames'];
    });
    this.carDataService.currentCarData.subscribe(val => {
      this.carData = val;
    });
    const url = this.router.url.slice(16);
    const name = decodeURIComponent(url);
    if (name) {
      this.auth.user$.pipe(take(1)).subscribe(val => {
        this.indexConstTrip = val.constTrips.findIndex(
          element => element['name'] === name
        );
        val.constTrips
          .filter(element => element['name'] === name)
          .map(saveConstTrip => {
            for (let index = 1; index <= 7; index++) {
              let pas = '';
              if (index === 1) {
                pas = 'driver';
              } else {
                pas = 'pas' + index;
              }
              this.constTrip.name = saveConstTrip['name'];
              this.constTrip[pas].name = saveConstTrip[pas]['name'];
              this.constTrip[pas].bill.nameOfBill =
                saveConstTrip[pas]['bill']['nameOfBill'];
              this.constTrip[pas].bill.paidByOrganization =
                saveConstTrip[pas]['bill']['paidByOrganization'];
            }
          });
      });
    }
  }

  // TODO: להוריד את האפס שם ולצור דרך אחרת לאפס את השם ויעד חיוב
  test() { }
  // TODO: למחוק פונציה test()

  openDialogPasNames(psaSelected: string) {
    const dialogPasName = this.dialogPasPickr.open(PasPickrComponent, {
      maxWidth: 400,
      panelClass: 'custom-dialog',
      data: {
        pasNames: this.pasNames,
        psaSelected
      },
      autoFocus: true

      // TODO: חזרה אחורה בטלפון תסגור את הדיאלוג
    });

    dialogPasName.afterClosed().subscribe(selected => {
      if (selected) {
        if (selected === 'אפס שם') {
          this.constTrip[psaSelected]['name'] = '';
        } else {
          this.constTrip[psaSelected]['name'] = selected;
          this.openDialogPasBill(psaSelected);
        }
        // TODO: לסדר איפוס של המשתנה
      } else {
        console.log(selected);
        // TODO: לסדר חוסר בחירה
      }
    });
  }

  openDialogPasBill(billSelected: string) {
    const dialogPasBill = this.dialogPasPickr.open(BillPickrComponent, {
      maxWidth: 400,
      panelClass: 'custom-dialog',
      data: {
        billselected: billSelected,
        pasName: this.constTrip[billSelected]['name'],
        generalBillNames: this.billNames['general']
      },
      autoFocus: false
      // TODO: קריאה של היעדי חיוב עיקריים
    });
    dialogPasBill.afterClosed().subscribe(selected => {
      if (selected) {
        if (selected === 'אפס יעד חיוב') {
          this.constTrip[billSelected]['bill'].nameOfBill = '';
          this.constTrip[billSelected]['bill'].paidByOrganization = '';
        } else {
          this.constTrip[billSelected]['bill'].nameOfBill = selected;
          if (selected.includes('-')) {
            const selectedPaidByOrganization = selected.split('-');
            this.constTrip[billSelected]['bill'].paidByOrganization =
              selectedPaidByOrganization[0];
          } else {
            this.constTrip[billSelected]['bill'][
              'paidByOrganization'
            ] = selected;
          }
          let pasNumber = billSelected.split('pas');
          const numberOfPas = parseInt(pasNumber[1], 10) + 1;
          if (pasNumber[0] === 'driver') {
            pasNumber[1] = '2';
          } else {
            if (!this.carData.sevenPasCar) {
              if (numberOfPas < 6) {
                pasNumber[1] = numberOfPas.toString();
              } else {
                pasNumber[1] = '';
              }
            } else {
              if (numberOfPas > 7) {
                pasNumber[1] = '';
              } else {
                pasNumber[1] = numberOfPas.toString();
              }
            }
          }
          pasNumber[0] = 'pas';
          if (pasNumber[1] !== '') {
            const newPasName = pasNumber[0] + pasNumber[1];
            if (this.carData['currentTrip'][newPasName]['name'] === '') {
              this.openDialogPasNames(newPasName);
            }
          }
        }
      } else {
        console.log(selected);
        // TODO: מה עושים שלא בוחרים במשהו
      }
    });
  }

  saveConstTrip() {
    if (!this.constTrip.name) {
      this.snackBar.open('חסר שם נסיעה קבועה', '', {
        verticalPosition: 'top',
        duration: 3000
      });
    } else {
      for (let index = 1; index <= 7; index++) {
        let pas = '';
        if (index === 1) {
          pas = 'driver';
        } else {
          pas = 'pas' + index;
        }
        this.constTrip[pas].name = this.carData.currentTrip[pas]['name'];
        this.constTrip[pas].bill.nameOfBill = this.carData.currentTrip[pas][
          'bill'
        ]['nameOfBill'];
        this.constTrip[pas].bill.paidByOrganization = this.carData.currentTrip[
          pas
        ]['bill']['paidByOrganization'];
      }

      this.auth.user$.pipe(take(1)).subscribe(val => {
        if (this.indexConstTrip !== -1) {
          val.constTrips[this.indexConstTrip] = this.constTrip;
          console.log('שינוי נסיעה קיימת', val.constTrips[this.indexConstTrip]);
        } else if (val.constTrips) {
          val.constTrips.push(this.constTrip);
          console.log('נסיעה חדשה');
        } else {
          val.constTrips = [];
          val.constTrips.push(this.constTrip);
          console.log('נסיעה ראשונה');
        }
        console.log(val);
        this.auth.updateUserData(val);
        this.router.navigate(['/main-from']);
      });
    }
  }
}
