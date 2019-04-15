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
  templateUrl: './biil-pickr.component.html',
  styleUrls: ['./biil-pickr.component.scss']
})
export class BiilPickrComponent implements OnInit {
  carData: carModule;
  displayName: string;
  myControl = new FormControl();
  billNames: string[] = this.data.generalBillNames;
  options: string[];
  filteredOptions: Observable<string[]>;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<BiilPickrComponent>,
    public carDataService: CarDataService,
    public dataFBService: DataFBService
  ) {}

  choosePas(event: any): void {
    this.dialogRef.close(event);
  }

  ngOnInit() {
    this.carDataService.currentCarData.subscribe(async val => {
      this.carData = val;
      await this.setPasMainBill(this.data.billselected);

      // this.filteredOptions = await this.myControl.valueChanges.pipe(
      //   startWith(''),
      //   map(value => this._filter(value))
      // );
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
      option.toLowerCase().startsWith(filterValue)
    );
  }

  setPasMainBill(pasBillSelected) {
    this.dataFBService.getUserData(this.data.pasName).subscribe(userData => {
      if (userData.length !== 0) {
        this.billNames = userData[0]['mainBills'];
      }

      this.options = this.billNames;

      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    });
  }
}
