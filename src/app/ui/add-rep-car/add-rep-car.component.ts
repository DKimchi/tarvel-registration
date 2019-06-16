import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { carModule } from 'src/app/models/car-module';
import { CarDataService } from 'src/app/services/car-data.service';

@Component({
  selector: 'app-add-rep-car',
  templateUrl: './add-rep-car.component.html',
  styleUrls: ['./add-rep-car.component.scss']
})
export class AddRepCarComponent implements OnInit {
  repCarName: string;
  repCarData: carModule = {
    whereToRegister: '',
    name: '',
    typeOfCar: '',
    typename: '',
    responsible: '',
    carPayBy: '',
    lastRegister: '',
    lastTrip: {
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
    replacement: {
      replacingCarCollection: '',
      active: false,
      replacingCar: '',
      startDateInFleet: null,
      endDateInFleet: null,
      startKMinFleet: null,
      endKMinFleet: null
    },
    displayName: ''
  };

  newRepCarData = this.fb.group({
    typeName: ['', Validators.required],
    carNumber: [
      '',
      [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(8),
        Validators.pattern('^[0-9]*$')
      ]
    ],
    code: ['', Validators.required],
    startKMinFleet: ['', Validators.required]
  });
  constructor(
    private fb: FormBuilder,
    public carDataService: CarDataService,
    private router: Router
  ) {}

  ngOnInit() {}

  getErrorMessageForCarNumber() {
    return this.newRepCarData.controls.carNumber.hasError('required')
      ? 'חייב להכניס מספר רכב'
      : this.newRepCarData.controls.carNumber.hasError('pattern')
      ? 'חייב להיות 7 או 8 ספרות בלבד'
      : this.newRepCarData.controls.carNumber.hasError('minlength')
      ? 'חייב להיות 7 או 8 ספרות בלבד'
      : '';
  }

  onSubmit() {
    if (this.newRepCarData.valid) {
      let ArrCarNumber = Array.from(this.newRepCarData.value.carNumber);
      let displayCarNumber;
      if (ArrCarNumber.length == 7) {
        displayCarNumber = `${ArrCarNumber[0]}${ArrCarNumber[1]}-${
          ArrCarNumber[2]
        }${ArrCarNumber[3]}${ArrCarNumber[4]}-${ArrCarNumber[5]}${
          ArrCarNumber[6]
        }`;
      } else if (ArrCarNumber.length == 8) {
        displayCarNumber = `${ArrCarNumber[0]}${ArrCarNumber[1]}${
          ArrCarNumber[2]
        }-${ArrCarNumber[3]}${ArrCarNumber[4]}-${ArrCarNumber[5]}${
          ArrCarNumber[6]
        }${ArrCarNumber[7]}`;
      }
      this.repCarData = {
        whereToRegister: this.carDataService.carData.whereToRegister,
        name: `רכב חלופי ל${this.carDataService.carData.name}`,
        typeOfCar: this.carDataService.carData.typeOfCar,
        typename: this.newRepCarData.value.typeName,
        responsible: this.carDataService.carData.responsible,
        carPayBy: this.carDataService.carData.carPayBy,
        lastRegister: '',
        lastTrip: {
          whereToRegister: '',
          carName: '',
          monthBill: '',
          dateAndTime: new Date(),
          startKM: this.newRepCarData.value.startKMinFleet,
          endKM: this.newRepCarData.value.startKMinFleet,
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
          startKM: this.newRepCarData.value.startKMinFleet
        },
        collectionOfCar: 'חלופים',
        rentCompany: {
          name: this.carDataService.carData.rentCompany.name,
          tel: this.carDataService.carData.rentCompany.tel
        },
        sevenPasCar: false,
        carNumber: this.newRepCarData.value.carNumber,
        code: this.newRepCarData.value.code,
        registerOn: '',
        permissibletoDrive: this.carDataService.carData.permissibletoDrive,
        replacement: {
          replacingCarCollection: this.carDataService.carData.collectionOfCar,
          active: true,
          replacingCar: this.carDataService.carData.name,
          startDateInFleet: new Date(),
          endDateInFleet: null,
          startKMinFleet: this.newRepCarData.value.startKMinFleet,
          endKMinFleet: null
        },
        displayName: `רכב חלופי ל${this.carDataService.carData.name}: ${
          this.newRepCarData.value.typeName
        } - ${displayCarNumber}`
      };
      this.carDataService.updateRepCarData(this.repCarData);
      this.carDataService.dataForCarSelected(this.repCarData);
      this.carDataService.changeTextName();
      this.carDataService.carChosen = true;
      this.router.navigate(['/main-from']);
    }
  }
}
