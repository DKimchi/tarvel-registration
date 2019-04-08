import { Component, OnInit } from '@angular/core';

import { carModule } from 'src/app/models/car-module';
import { CarDataService } from 'src/app/services/car-data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DataFBService } from 'src/app/services/data-fb.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-car-detail',
  templateUrl: './add-car-detail.component.html',
  styleUrls: ['./add-car-detail.component.scss']
})
export class AddCarDetailComponent implements OnInit {
  collectionOfCarFromDB: [];
  cardata: carModule = {
    name: '',
    typeOfCar: '',
    typename: '',
    responsible: '',
    carPayBy: '',
    lastRegister: '',
    lastTrip: {
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
      occasional: {
        startDateInFleet: null,
        endDateInFleet: null,
        startKMinFleet: null,
        endKMinFleet: null
      },
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
    private carDataService: CarDataService,
    private fb: FormBuilder,
    public dataFBService: DataFBService,
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
      });
  }

  getCarData() {
    this.newCarData.patchValue({
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
  }
}
