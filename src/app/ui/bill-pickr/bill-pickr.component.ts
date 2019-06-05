import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CarDataService } from 'src/app/services/car-data.service';
import { carModule } from 'src/app/models/car-module';
import { DataFBService } from 'src/app/services/data-fb.service';

@Component({
  selector: 'app-biil-pickr',
  templateUrl: './bill-pickr.component.html',
  styleUrls: ['./bill-pickr.component.scss']
})
export class BillPickrComponent implements OnInit {
  carData: carModule;
  fullBillList = true;
  disabledBillList = false;
  displayName: string;
  myControl = new FormControl();
  billNames: string[] = this.data.generalBillNames;
  options: string[];
  filteredOptions: Observable<string[]>;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<BillPickrComponent>,
    public carDataService: CarDataService,
    public dataFBService: DataFBService
  ) {}

  choosePas(event: any): void {
    this.dialogRef.close(event);
  }

  ngOnInit() {
    this.carDataService.currentCarData.subscribe(async val => {
      this.carData = val;
      await this.setPasMainBill();

      switch (this.data.billselected) {
        case 'driver':
          this.displayName = 'בחר יעד חיוב לנהג';
          break;
        case 'pas2':
          this.displayName = 'בחר יעד חיוב לנוסע 2';
          break;
        case 'pas3':
          this.displayName = 'בחר יעד חיוב לנוסע 3';
          break;
        case 'pas4':
          this.displayName = 'בחר יעד חיוב לנוסע 4';
          break;
        case 'pas5':
          this.displayName = 'בחר יעד חיוב לנוסע 5';
          break;
        case 'pas6':
          this.displayName = 'בחר יעד חיוב לנוסע 6';
          break;
        case 'pas7':
          this.displayName = 'בחר יעד חיוב לנוסע 7';
          break;
        default:
          this.displayName = 'נוסע לא ידוע';
          break;
      }
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }

  changeBillList() {
    if (this.fullBillList) {
      this.options = this.data.generalBillNames;
    } else {
      this.options = this.billNames;
    }

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  setPasMainBill() {
    this.dataFBService.getUserData(this.data.pasName).subscribe(userData => {
      if (userData.length !== 0) {
        if (userData[0]['mainBills'].length !== 0) {
          this.billNames = userData[0]['mainBills'];
          this.fullBillList = false;
        } else {
          this.disabledBillList = true;
        }
      } else {
        this.disabledBillList = true;
      }

      this.changeBillList();
    });
  }
}
