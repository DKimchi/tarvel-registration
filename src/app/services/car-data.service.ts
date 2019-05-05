import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

import { carModule } from '../models/car-module';
import { DataFBService } from '../services/data-fb.service';
import {
  AngularFirestoreDocument,
  AngularFirestore
} from '@angular/fire/firestore';
import { CastExpr } from '@angular/compiler';
import { element } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class CarDataService {
  isCarSelected = false;
  carData: carModule = {
    name: '',
    displayName: '',
    typeOfCar: '',
    typename: '',
    responsible: '',
    carPayBy: '',
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
    startKMinFleet: null,
    occasional: {
      startDateInFleet: null,
      endDateInFleet: null,
      startKMinFleet: null,
      endKMinFleet: null
    }
  };
  private carDataSource = new BehaviorSubject(this.carData);
  currentCarData = this.carDataSource.asObservable();

  private subscribe: Subscription;
  constructor(
    public dataService: DataFBService,
    private afs: AngularFirestore
  ) {}

  getDataFormFB(collectionOfCar: string, carName: string) {
    this.dataService.checkIfCarExists(collectionOfCar, carName).then(val => {
      let carSelected;
      if (val) {
        this.isCarSelected = true;
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

  public updateCarData(Car: carModule) {
    // Sets user data to firestore on login
    const carRef: AngularFirestoreDocument<carModule> = this.afs.doc(
      `${Car.collectionOfCar}/${Car.name}`
    );

    const data = {
      name: Car.name,
      typeOfCar: Car.typeOfCar,
      typename: Car.typename,
      responsible: Car.responsible,
      carPayBy: Car.carPayBy,
      lastRegister: Car.lastRegister,
      lastTrip: Car.lastTrip,
      currentTrip: Car.currentTrip,
      collectionOfCar: Car.collectionOfCar,
      rentCompany: {
        name: Car.rentCompany.name,
        tel: Car.rentCompany.tel
      },
      sevenPasCar: Car.sevenPasCar,
      carNumber: Car.carNumber,
      code: Car.code,
      registerOn: Car.registerOn,
      permissibletoDrive: Car.permissibletoDrive,
      startKMinFleet: Car.startKMinFleet
    };
    this.dataService.addCarToCarNames(Car.name, Car.collectionOfCar);
    return carRef.set(data, { merge: true });
  }

  public updateOccCarData(Car: carModule) {
    // Sets user data to firestore on login
    const carRef: AngularFirestoreDocument<carModule> = this.afs.doc(
      `${Car.collectionOfCar}/${Car.name}`
    );

    const data = {
      name: Car.name,
      displayName: Car.displayName,
      typeOfCar: Car.typeOfCar,
      typename: Car.typename,
      responsible: Car.responsible,
      carPayBy: Car.carPayBy,
      lastRegister: Car.lastRegister,
      lastTrip: Car.lastTrip,
      currentTrip: Car.currentTrip,
      collectionOfCar: Car.collectionOfCar,
      rentCompany: {
        name: Car.rentCompany.name,
        tel: Car.rentCompany.tel
      },
      sevenPasCar: Car.sevenPasCar,
      carNumber: Car.carNumber,
      code: Car.code,
      registerOn: Car.registerOn,
      permissibletoDrive: Car.permissibletoDrive,
      occasional: {
        startDateInFleet: Car.occasional.startDateInFleet,
        endDateInFleet: Car.occasional.endDateInFleet,
        startKMinFleet: Car.occasional.startKMinFleet,
        endKMinFleet: Car.occasional.endKMinFleet
      }
    };
    this.dataService.addOccCarToCarNames(Car.name, Car.displayName);
    return carRef.set(data);
  }

  resetCarData() {
    this.isCarSelected = false;
    const carData: carModule = {
      name: '',
      displayName: '',
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
        numberOfPas: null,
        collectionOfCar: '',
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
      startKMinFleet: null,
      occasional: {
        startDateInFleet: null,
        endDateInFleet: null,
        startKMinFleet: null,
        endKMinFleet: null
      }
    };
    this.dataForCarSelected(carData);
    this.subscribe.unsubscribe();
  }
}
