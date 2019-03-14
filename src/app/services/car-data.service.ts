import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

import { carModule } from '../models/car-module';
import { DataFBService } from '../services/data-fb.service';

@Injectable({
  providedIn: 'root'
})
export class CarDataService {
  carData: carModule = {
    name: '',
    typeOfCar: '',
    responsible: '',
    payment: '',
    lastRegister: '',
    lastTrip: {
      carName: '',
      monthBill: '',
      dateAndTime: new Date(),
      startKM: null,
      endKM: null,
      carPayBy: '',
      carResponsible: '',
      carNumber: '',
      collectionOfCar: '',
      numberOfPas: null,
      occasional: {
        startDateInFleet: new Date(),
        endDateInFleet: new Date(),
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
    registerOn: ''
  };
  private carDataSource = new BehaviorSubject(this.carData);
  currentCarData = this.carDataSource.asObservable();

  private subscribe: Subscription;
  constructor(public dataService: DataFBService) {}

  getDataFormFB(collectionOfCar: string, carName: string) {
    const checkCar = this.dataService
      .checkIfCarExists(collectionOfCar, carName)
      .then(val => {
        let carSelected;
        if (val) {
          this.subscribe = this.dataService
            .getCarDoc(collectionOfCar, carName)
            .subscribe(val => {
              carSelected = val;
              this.dataForCarSelected(carSelected);
              console.log('קיים');
            });
        } else {
          this.resetCarData();
          console.log('לא קיים');
        }
      });
  }

  dataForCarSelected(carData: carModule) {
    this.carDataSource.next(carData);
  }

  resetCarData() {
    const carData: carModule = {
      name: '',
      typeOfCar: '',
      responsible: '',
      payment: '',
      lastRegister: '',
      lastTrip: {
        carName: '',
        monthBill: '',
        dateAndTime: new Date(),
        startKM: null,
        endKM: null,
        carPayBy: '',
        carResponsible: '',
        carNumber: '',
        numberOfPas: null,
        collectionOfCar: '',
        occasional: {
          startDateInFleet: new Date(),
          endDateInFleet: new Date(),
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
      registerOn: ''
    };
    this.dataForCarSelected(carData);
    this.subscribe.unsubscribe();
  }
}
