import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataFBService } from 'src/app/services/data-fb.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-pickr',
  templateUrl: './car-pickr.component.html',
  styleUrls: ['./car-pickr.component.scss']
})
export class CarPickrComponent implements OnInit {
  listOfCollection: Array<string>;
  collectionOfCar: string = this.data.collectionOfCar;
  // TODO: open  collectionOfCar from uesr Default
  generalData: object;
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  constructor(
    public dialogRef: MatDialogRef<CarPickrComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any,
    public dataFBService: DataFBService
  ) {
    this.dataFBService.getGeneralDataFormFB().subscribe(val => {
      this.listOfCollection = val['carCollection'];
    });
  }

  getCarNames() {
    this.dataFBService
      .getCarNames(this.collectionOfCar)
      .toPromise()
      .then(val => {
        this.options = val['carNames'];
      })
      .then(() => {
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value))
        );
      })
      .catch(err => console.log(err));
  }
  // TODO: לסדר את הפוקוס ותחלה של הבחירת רכבים
  chooseCar(carName: string): void {
    const carSelected = {
      carName,
      carCollection: this.collectionOfCar
    };
    this.dialogRef.close(carSelected);
  }

  ngOnInit() {
    this.getCarNames();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option =>
      option.toLowerCase().startsWith(filterValue)
    );
  }

  openAddOccCar() {
    this.dialogRef.close('openAddOccCar');
  }

  closedCarPickr() {
    this.dialogRef.close();
  }
}
