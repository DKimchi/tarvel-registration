import { Component, OnInit } from '@angular/core';

import { carModule } from 'src/app/models/car-module';
import { CarDataService } from 'src/app/services/car-data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DataFBService } from 'src/app/services/data-fb.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogMessageComponent } from '../dialog-message/dialog-message.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-car-detail',
  templateUrl: './add-car-detail.component.html',
  styleUrls: ['./add-car-detail.component.scss']
})
export class AddCarDetailComponent implements OnInit {
  placesToRegisterCars = [];
  payingCorporationsForCars = [];
  collectionOfCarFromDB: [];
  cardata: carModule = {
    openRegistration: null,
    whereToRegister: '',
    name: '',
    displayName: '',
    typeOfCar: '',
    typename: '',
    responsible: '',
    carPayBy: '',
    lastRegister: '',
    lastTrip: {
      openRegistration: null,
      whereToRegister: '',
      carName: '',
      monthBill: '',
      dateAndTime: null,
      startKM: null,
      endKM: null,
      carPayBy: '',
      carResponsible: '',
      carNumber: '',
      collectionOfCar: '',
      numberOfPas: null,
      driver: {
        name: '',
        bill: {
          paidByOrganization: '',
          nameOfBill: ''
        },
        circleOfBelonging: ''
      },
      pas2: {
        name: '',
        bill: {
          paidByOrganization: '',
          nameOfBill: ''
        },
        circleOfBelonging: ''
      },
      pas3: {
        name: '',
        bill: {
          paidByOrganization: '',
          nameOfBill: ''
        },
        circleOfBelonging: ''
      },
      pas4: {
        name: '',
        bill: {
          paidByOrganization: '',
          nameOfBill: ''
        },
        circleOfBelonging: ''
      },
      pas5: {
        name: '',
        bill: {
          paidByOrganization: '',
          nameOfBill: ''
        },
        circleOfBelonging: ''
      },
      pas6: {
        name: '',
        bill: {
          paidByOrganization: '',
          nameOfBill: ''
        },
        circleOfBelonging: ''
      },
      pas7: {
        name: '',
        bill: {
          paidByOrganization: '',
          nameOfBill: ''
        },
        circleOfBelonging: ''
      }
    },
    currentTrip: {
      driver: {
        name: '',
        bill: {
          paidByOrganization: '',
          nameOfBill: ''
        },
        circleOfBelonging: ''
      },
      pas2: {
        name: '',
        bill: {
          paidByOrganization: '',
          nameOfBill: ''
        },
        circleOfBelonging: ''
      },
      pas3: {
        name: '',
        bill: {
          paidByOrganization: '',
          nameOfBill: ''
        },
        circleOfBelonging: ''
      },
      pas4: {
        name: '',
        bill: {
          paidByOrganization: '',
          nameOfBill: ''
        },
        circleOfBelonging: ''
      },
      pas5: {
        name: '',
        bill: {
          paidByOrganization: '',
          nameOfBill: ''
        },
        circleOfBelonging: ''
      },
      pas6: {
        name: '',
        bill: {
          paidByOrganization: '',
          nameOfBill: ''
        },
        circleOfBelonging: ''
      },
      pas7: {
        name: '',
        bill: {
          paidByOrganization: '',
          nameOfBill: ''
        },
        circleOfBelonging: ''
      },
      startKM: null
    },
    collectionOfCar: '',
    rentCompany: {
      name: '',
      tel: ''
    },
    sevenPasCar: false,
    carNumber: '',
    code: '',
    registerOn: '',
    permissibletoDrive: '',
    startKMinFleet: null
  };
  newCarData = this.fb.group({
    whereToRegister: ['', Validators.required],
    name: ['', Validators.required],
    typeOfCar: ['', Validators.required],
    typeName: ['', Validators.required],
    responsible: ['', Validators.required],
    carPayBy: ['', Validators.required],
    sevenPasCar: [false],
    carNumber: ['', Validators.required],
    code: [''],
    registerOn: [''],
    collectionOfCar: ['', Validators.required],
    companyName: [''],
    companyTel: [''],
    permissibletoDrive: ['', Validators.required],
    startKMinFleet: ['number', Validators.required]
  });

  constructor(
    private dialogMessage: MatDialog,
    private carDataService: CarDataService,
    private fb: FormBuilder,
    public dataFBService: DataFBService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.carDataService.currentCarData.subscribe(val => {
      this.cardata = val;
      this.getCarData();
      console.log(this.newCarData);
    });
    this.dataFBService
      .getGeneralDataFormFB()
      .pipe(take(1))
      .subscribe(val => {
        this.collectionOfCarFromDB = val['carCollection'];
        this.payingCorporationsForCars = val['payingCorporationsForCars'];
        this.placesToRegisterCars = val['placesToRegisterCars'];
      });
  }

  getCarData() {
    this.newCarData.patchValue({
      whereToRegister: this.cardata.whereToRegister,
      name: this.cardata.name,
      typeOfCar: this.cardata.typeOfCar,
      typeName: this.cardata.typename,
      responsible: this.cardata.responsible,
      carPayBy: this.cardata.carPayBy,
      sevenPasCar: this.cardata.sevenPasCar,
      carNumber: this.cardata.carNumber,
      code: this.cardata.code,
      registerOn: this.cardata.registerOn,
      collectionOfCar: this.cardata.collectionOfCar,
      companyName: this.cardata.rentCompany.name,
      companyTel: this.cardata.rentCompany.tel,
      permissibletoDrive: this.cardata.permissibletoDrive,
      startKMinFleet: this.cardata.startKMinFleet
    });
  }

  onSubmit() {
    if (this.newCarData.status === 'VALID') {
      const carDetails: carModule = {
        openRegistration: null,
        whereToRegister: this.newCarData.value.whereToRegister,
        name: this.newCarData.value.name,
        typeOfCar: this.newCarData.value['typeOfCar'],
        typename: this.newCarData.value['typeName'],
        responsible: this.newCarData.value['responsible'],
        carPayBy: this.newCarData.value['carPayBy'],
        lastRegister: '',
        lastTrip: this.cardata.lastTrip,
        currentTrip: this.cardata.currentTrip,
        collectionOfCar: this.newCarData.value['collectionOfCar'],
        rentCompany: {
          name: this.newCarData.value['companyName'],
          tel: this.newCarData.value['companyTel']
        },
        sevenPasCar: this.newCarData.value['sevenPasCar'],
        carNumber: this.newCarData.value['carNumber'],
        code: this.newCarData.value['code'],
        registerOn: '',
        permissibletoDrive: this.newCarData.value['permissibletoDrive'],
        startKMinFleet: this.newCarData.value['startKMinFleet']
      };
      this.carDataService.updateCarData(carDetails);
      this.carDataService.dataForCarSelected(carDetails);
      this.router.navigate(['/main-from']);
    }
    // TODO: להגדיר מה קורה שטופס לא מלא ברכב חדש
  }
  deleteConstCer(){
    const dialogPasName = this.dialogMessage.open(DialogMessageComponent, {
      maxWidth: 400,
      data: {
        carName: this.cardata.name,
        messageName: 'deleteConstCer',
        
      },
      autoFocus: false,
      panelClass: 'confirmedLongTrip'
      // TODO: חזרה אחורה בטלפון תסגור את הדיאלוג
    });
    dialogPasName.afterClosed().subscribe(confirmTrip => {
      if (confirmTrip) {
        this.deleteCarFormDB();
      } else {
        this.notDeleteConstCar();
      }
    });
  }
  deleteCarFormDB(){

    const carNameToDel = this.cardata.name + ' נמחק מהרישום נסיעות'
    this.snackBar.open(carNameToDel, '', {
      verticalPosition: 'top',
      duration: 2000
    });
    this.dataFBService.removeCarFromCarNames(this.cardata.name, 
    this.cardata.collectionOfCar )
    this.carDataService.resetCarData();
    this.router.navigate(['/main-from']);
  }
  notDeleteConstCar(){
    const carNameToDel = this.cardata.name + ' לא נמחק'
    this.snackBar.open(carNameToDel, '', {
      verticalPosition: 'top',
      duration: 2000
    });
  }
}
