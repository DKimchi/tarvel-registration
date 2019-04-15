import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';

import { carModule } from 'src/app/models/car-module';
import { CarDataService } from 'src/app/services/car-data.service';
import { DataFBService } from 'src/app/services/data-fb.service';
import { PasPickrComponent } from '../pas-pickr/pas-pickr.component';
import { BiilPickrComponent } from '../biil-pickr/biil-pickr.component';

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
  ) {}

  ngOnInit() {
    this.carDataService.currentCarData.subscribe(val => {
      this.carData = val;
    });
    this.dataFBService.getGeneralDataFormFB().subscribe(val => {
      this.pasNames = val['pasNames'].split(',');
      this.billNames['general'] = val['billNames'].split(',');
      this.pasNames.unshift('אפס שם');

      //TODO: להוריד את האפס שם ולצור דרך אחרת לאפס את השם ויעד חיוב
    });
  }
  getNames() {
    console.log(this.pasNames);
    console.log(this.billNames);
  }

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
          this.carData['currentTrip'][psaSelected]['name'] = '';
          this.carData['currentTrip'][psaSelected]['circleOfBelonging'] = '';
        } else {
          this.carData['currentTrip'][psaSelected]['name'] = selected;
        }
        // TODO: לסדר איפוס של המשתנה
      } else {
        console.log(selected);
        // TODO: לסדר חוסר בחירה
      }
    });
  }

  async openDialogPasBill(billSelected: string) {
    const dialogPasBill = await this.dialogPasPickr.open(BiilPickrComponent, {
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
          this.carData['currentTrip'][billSelected]['bill']['nameOfBill'] = '';
        } else {
          this.carData['currentTrip'][billSelected]['bill'][
            'nameOfBill'
          ] = selected;
        }
      } else {
        console.log(selected);
        // TODO: מה עושים שלא בוחרים במשהו
      }
    });
  }
}
