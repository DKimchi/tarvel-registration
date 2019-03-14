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
import {
  RepositionScrollStrategy,
  CloseScrollStrategy
} from '@angular/cdk/overlay';

@Component({
  selector: 'app-car-selector',
  templateUrl: './car-selector.component.html',
  styleUrls: ['./car-selector.component.scss']
})
export class CarSelectorComponent implements OnInit {
  carNames: string[];
  // carData;
  listOfCollection: Array<string>;
  collectionOfCar = 'משעול-קבוע';
  // TODO: open  collectionOfCar from uesr Default
  generalData: object;
  selectCarBtnText = 'פתיחה';
  carData: carModule;
  constructor(
    public dialog: MatDialog,
    // private bottomSheet: MatBottomSheet,
    public dataFBService: DataFBService,
    public carDataService: CarDataService
  ) {}

  ngOnInit() {
    this.dataFBService.getGeneralDataFormFB().subscribe(val => {
      this.listOfCollection = val['carCollection'];
      this.generalData = val;
    });

    this.carDataService.currentCarData.subscribe(val => {
      this.carData = val;
    });
  }

  openCarPickrDialog() {
    const dialogRef = this.dialog.open(CarPickrComponent, {
      maxWidth: 400,
      panelClass: 'custom-dialog',
      data: {
        collectionOfCar: this.collectionOfCar
      },
      autoFocus: false,
      closeOnNavigation: false
    });
    dialogRef.afterClosed().subscribe(selected => {
      if (selected) {
        this.carDataService.getDataFormFB(this.collectionOfCar, selected);
        this.carDataService.currentCarData.subscribe(val => {
          this.carData = val;
          console.log(this.carData);
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
        });
      } else {
        console.log(selected);
      }
    });
  }
  // openBottomSheet() {
  //   const Sheet = this.bottomSheet.open(CarPickrComponent, {
  //     data: {
  //       collectionOfCar: this.collectionOfCar,
  //       carNames: this.carNames
  //     },
  //     autoFocus: true,
  //     panelClass: 'custom-height-bottom-sheet'
  //   });
  //   Sheet.afterDismissed().subscribe(selected => {
  //     if (selected) {
  //       this.carDataService.getDataFormFB(this.collectionOfCar, selected);
  //       this.carDataService.currentCarData.subscribe(val => {
  //         this.carData = val;
  //         if (this.carData['code']) {
  //           this.selectCarBtnText =
  //             this.carData['name'] + ': קוד ' + this.carData['code'];
  //         } else if (this.carData['name']) {
  //           this.selectCarBtnText = this.carData['name'];
  //         } else if (this.carData['name'] === '') {
  //           this.selectCarBtnText = 'בחר רכב';
  //         } else {
  //           this.selectCarBtnText = 'רכב לא במערכת';
  //           // TODO: להפנות למקום משכניסים את הרכבים.
  //         }
  //       });
  //     } else {
  //       console.log(selected);
  //     }
  //   });
  // }
}
