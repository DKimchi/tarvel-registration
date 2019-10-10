import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { carModule } from 'src/app/models/car-module';
import { CarDataService } from 'src/app/services/car-data.service';
import { DataFBService } from 'src/app/services/data-fb.service';
import { PasPickrComponent } from '../pas-pickr/pas-pickr.component';
import { BillPickrComponent } from '../bill-pickr/bill-pickr.component';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-pas-selector',
  templateUrl: './pas-selector.component.html',
  styleUrls: ['./pas-selector.component.scss']
})
export class PasSelectorComponent implements OnInit {
  carData: carModule;
  pasNames: string[];
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
  constructor(
    private dialogPasPickr: MatDialog,
    public carDataService: CarDataService,
    public dataFBService: DataFBService
  ) { }
  @Output() openConstTrips: EventEmitter<boolean> = new EventEmitter();

  ngOnInit() {
    this.carDataService.currentCarData.subscribe(val => {
      this.carData = val;
    });

    this.carDataService.change.subscribe(newCarChoose => {
      if (
        this.carData['currentTrip']['driver']['name'] === '' &&
        this.carData.name !== ''
      ) {
        this.openDialogPasNames('driver');
      }
    });

    this.dataFBService.getGeneralDataFormFB().subscribe(val => {
      this.pasNames = val['pasNames'].split(',');
      this.billNames['general'] = val['arrBillNames'];
      //TODO: להוריד את האפס שם ולצור דרך אחרת לאפס את השם ויעד חיוב
    });
  }

  public openDialogPasNames(psaSelected: string) {
    const dialogPasName = this.dialogPasPickr.open(PasPickrComponent, {
      maxWidth: 400,
      panelClass: 'custom-dialog',
      data: {
        pasNames: this.pasNames,
        pasName: this.carData.currentTrip[psaSelected]['name'],
        psaSelected
      },
      autoFocus: true

      // TODO: חזרה אחורה בטלפון תסגור את הדיאלוג
    });

    dialogPasName.afterClosed().subscribe(selected => {
      if (selected) {
        if (selected === 'אפס שם') {
          this.carData['currentTrip'][psaSelected]['name'] = '';
          this.carData['currentTrip'][psaSelected]['bill']['nameOfBill'] = '';
          this.carData['currentTrip'][psaSelected]['bill'][
            'paidByOrganization'
          ] = '';
          this.carData['currentTrip'][psaSelected]['circleOfBelonging'] = '';
        } else {
          if (selected !== 'constTrip') {
            this.carData['currentTrip'][psaSelected]['name'] = selected;
            this.openDialogPasBill(psaSelected);
          } else {
            this.carDataService.constTrip = true;
          }
        }
        this.carDataService.startTripBtnText = 'התחלת נסיעה';
        this.carDataService.changeTextName();

        // TODO: לסדר איפוס של המשתנה
      } else {
        console.log(selected);
        // TODO: לסדר חוסר בחירה
      }
    });
  }

  async openDialogPasBill(billSelected: string) {
    const dialogPasBill = await this.dialogPasPickr.open(BillPickrComponent, {
      maxWidth: 400,
      panelClass: 'custom-dialog',
      data: {
        billselected: billSelected,
        pasName: this.carData['currentTrip'][billSelected]['name'],
        generalBillNames: this.billNames['general']
      },
      autoFocus: false
      // TODO: קריאה של היעדי חיוב עיקריים
    });
    dialogPasBill.afterClosed().subscribe(selected => {
      if (selected) {
        if (selected === 'אפס יעד חיוב') {
          this.carData['currentTrip'][billSelected]['name'] = '';
          this.carData['currentTrip'][billSelected]['bill']['nameOfBill'] = '';
          this.carData['currentTrip'][billSelected]['bill'][
            'paidByOrganization'
          ] = '';
        } else {
          this.carData['currentTrip'][billSelected]['bill'][
            'nameOfBill'
          ] = selected;
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
        this.carDataService.startTripBtnText = 'התחלת נסיעה';
        this.carDataService.changeTextName();
      } else {
        console.log(selected);
        // TODO: מה עושים שלא בוחרים במשהו
      }
    });
  }
}
