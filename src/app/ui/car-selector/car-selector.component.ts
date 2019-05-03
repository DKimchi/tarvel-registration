import { Component, OnInit, Inject } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef,
  MatDialog
} from '@angular/material';

import { CarDataService } from 'src/app/services/car-data.service';
import { DataFBService } from 'src/app/services/data-fb.service';
import { carModule } from 'src/app/models/car-module';

import { CarPickrComponent } from '../car-pickr/car-pickr.component';
import { AuthService } from 'src/app/services/auth.service';
import { elementStart } from '@angular/core/src/render3';
import { take } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-car-selector',
  templateUrl: './car-selector.component.html',
  styleUrls: ['./car-selector.component.scss']
})
export class CarSelectorComponent implements OnInit {
  carNames: string[];
  listOfCollection: Array<string>;
  collectionOfCar: string = 'משעול-קבוע';
  // TODO: open  collectionOfCar from uesr Default
  generalData: object;
  selectCarBtnText = 'בחר רכב';
  carData: carModule;
  constructor(
    public auth: AuthService,
    public dialog: MatDialog,
    public dataFBService: DataFBService,
    public carDataService: CarDataService
  ) {
    this.auth.user$.subscribe(val => {
      this.collectionOfCar = val.defaultCollectionOfCar;
    });
  }

  ngOnInit() {
    this.dataFBService.getGeneralDataFormFB().subscribe(val => {
      this.listOfCollection = val['carCollection'];
      this.generalData = val;
    });
    this.carDataService.currentCarData.pipe(take(1)).subscribe(val => {
      this.carData = val;
      this.collectionOfCar = this.carData.collectionOfCar;
      console.log(this.collectionOfCar);
      console.log(this.carData.name);
      if (this.carData.name !== '') {
        this.carDataService.getDataFormFB(
          this.collectionOfCar,
          this.carData.name
        );
      }
      if (this.carData.displayName) {
        if (this.carData['code']) {
          this.selectCarBtnText =
            this.carData['displayName'] + ': קוד ' + this.carData['code'];
        } else if (this.carData['displayName']) {
          this.selectCarBtnText = this.carData['displayName'];
        } else if (this.carData['displayName'] === '') {
          this.selectCarBtnText = 'בחר רכב';
        } else {
          this.selectCarBtnText = 'רכב לא במערכת';
          // TODO: להפנות למקום משכניסים את הרכבים.
        }
      } else {
        if (this.carData['code']) {
          this.selectCarBtnText =
            this.carData['name'] + ': קוד ' + this.carData['code'];
        } else if (this.carData['name']) {
          this.selectCarBtnText = this.carData['name'];
        } else if (this.carData['name'] === '') {
          this.selectCarBtnText = 'בחר רכב';
        } else {
          this.selectCarBtnText = 'רכב לא במערכת';
          // TODO: להפנות למקום משכניסים את הרכבים.
        }
      }
    });
  }

  openCarPickrDialog() {
    console.log(this.collectionOfCar);
    const dialogRef = this.dialog.open(CarPickrComponent, {
      maxWidth: 400,
      panelClass: 'custom-dialog',
      data: this.collectionOfCar,
      autoFocus: false
      // TODO: חזרה אחורה בטלפון תסגור את הדיאלוג
    });
    dialogRef.afterClosed().subscribe(selected => {
      if (selected) {
        const carNameInDB = selected.carName.split(':');
        console.log(carNameInDB);
        this.collectionOfCar = selected.carCollection;
        this.carDataService.getDataFormFB(
          selected.carCollection,
          carNameInDB[0]
        );
        this.carDataService.currentCarData.subscribe(val => {
          this.carData = val;
          if (this.carData.displayName) {
            if (this.carData['code']) {
              this.selectCarBtnText =
                this.carData['displayName'] + ': קוד ' + this.carData['code'];
            } else if (this.carData['displayName']) {
              this.selectCarBtnText = this.carData['displayName'];
            } else if (this.carData['displayName'] === '') {
              this.selectCarBtnText = 'בחר רכב';
            } else {
              this.selectCarBtnText = 'רכב לא במערכת';
              // TODO: להפנות למקום משכניסים את הרכבים.
            }
          } else {
            if (this.carData['code']) {
              this.selectCarBtnText =
                this.carData['name'] + ': קוד ' + this.carData['code'];
            } else if (this.carData['name']) {
              this.selectCarBtnText = this.carData['name'];
            } else if (this.carData['name'] === '') {
              this.selectCarBtnText = 'בחר רכב';
            } else {
              this.selectCarBtnText = 'רכב לא במערכת';
              // TODO: להפנות למקום משכניסים את הרכבים.
            }
          }
        });
      } else {
        console.log(selected);
      }
    });
  }
}
