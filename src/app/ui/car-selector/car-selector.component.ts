import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { CarDataService } from 'src/app/services/car-data.service';
import { DataFBService } from 'src/app/services/data-fb.service';
import { carModule } from 'src/app/models/car-module';
import { CarPickrComponent } from '../car-pickr/car-pickr.component';
import { AuthService } from 'src/app/services/auth.service';
import { take } from 'rxjs/operators';
import { User } from 'src/app/models/user-module';
import { Router } from '@angular/router';
import { PasSelectorComponent } from '../pas-selector/pas-selector.component';

@Component({
  selector: 'app-car-selector',
  templateUrl: './car-selector.component.html',
  styleUrls: ['./car-selector.component.scss']
})
export class CarSelectorComponent implements OnInit, OnChanges {
  userData: User;
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
  carNames: string[];
  listOfCollection: Array<string>;
  selectCarBtnText: string;
  collectionOfCar: string = 'משעול-קבוע';
  // TODO: open  collectionOfCar from uesr Default
  generalData: object;

  carData: carModule;
  constructor(
    public auth: AuthService,
    public dialog: MatDialog,
    public dataFBService: DataFBService,
    public carDataService: CarDataService,
    private router: Router,
    public pasSelector: PasSelectorComponent
  ) {
    this.auth.user$.subscribe(val => {
      this.collectionOfCar = val.defaultCollectionOfCar;
    });
  }
  @Input() carName: string;
  ngOnChanges(changes: SimpleChanges): void {
    this.carDataService.change.emit(true);
  }

  ngOnInit() {
    this.dataFBService.getGeneralDataFormFB().subscribe(val => {
      this.listOfCollection = val['carCollection'];
      this.generalData = val;
    });
    this.dataFBService.getGeneralDataFormFB().subscribe(val => {
      this.pasNames = val['pasNames'].split(',');
      this.billNames['general'] = val['billNames'].split(',');
      //TODO: להוריד את האפס שם ולצור דרך אחרת לאפס את השם ויעד חיוב
    });
    if (localStorage.getItem('carName')) {
      this.readCarData(
        localStorage.getItem('collectionOfCar'),
        localStorage.getItem('carName')
      );
    }
    this.carDataService.currentCarData.pipe(take(1)).subscribe(val => {
      this.carData = val;
      this.collectionOfCar = this.carData.collectionOfCar;
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

  async readCarData(carCollection: string, carName: string) {
    const carNameInDB = carName.split(':');
    if (carNameInDB[0].includes('רכב חלופי')) {
      this.carDataService.getDataFormFB('חלופים', carNameInDB[0]);
    } else {
      console.log(carCollection, carNameInDB[0]);
      this.collectionOfCar = carCollection;
      await this.carDataService.getDataFormFB(carCollection, carNameInDB[0]);
    }
    this.carDataService.currentCarData.subscribe(val => {
      this.carData = val;
      if (
        this.carData.openRegistration === null ||
        this.carData.openRegistration === undefined
      ) {
        this.carData.openRegistration = new Date();
      }
      localStorage.setItem('carName', this.carData.name);
      localStorage.setItem('collectionOfCar', this.carData.collectionOfCar);
      if (this.carData['code']) {
        this.selectCarBtnText =
          this.carData['name'] + ': קוד ' + this.carData['code'];
      } else if (this.carData['name']) {
        this.selectCarBtnText = this.carData['name'] + ': אין קוד';
      } else if (this.carData['name'] === '') {
        this.selectCarBtnText = 'בחר רכב';
      } else {
        this.selectCarBtnText = 'רכב לא במערכת';
        // TODO: להפנות למקום משכניסים את הרכבים.
      }
    });

    console.log(this.carData);
    this.carDataService.carChosen = true;
  }

  openCarPickrDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { collectionOfCar: `${this.collectionOfCar}` };
    dialogConfig.maxWidth = 400;
    dialogConfig.panelClass = 'custom-dialog';
    dialogConfig.autoFocus = false;
    const dialogRef = this.dialog.open(CarPickrComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(async selected => {
      if (selected) {
        if (selected === 'openAddOccCar') {
          this.router.navigate(['/add-occ-car']);
        } else {
          console.log(selected);
          this.readCarData(selected.carCollection, selected.carName);
        }
      } else {
        console.log(selected);
        // TODO: לתבל בבעיות שאין רכב.
      }
    });
  }
}
