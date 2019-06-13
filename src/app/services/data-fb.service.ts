import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { carModule } from '../models/car-module';
import { tripModule } from '../models/trip-module';

@Injectable({
  providedIn: 'root'
})
export class DataFBService {
  // tslint:disable-next-line:ban-types
  generalData: Object = {
    billNames: '',
    carCollection: [],
    InitialCode: '',
    pasNames: ''
  };

  constructor(private afs: AngularFirestore) {}

  getUserConstTrip(constTripName) {
    return this.afs
      .doc(constTripName)
      .valueChanges()
      .pipe(take(1));
  }

  getUserData(userName: string) {
    return this.afs
      .collection('users', ref => ref.where('displayName', '==', userName))
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            if (a.payload.doc.exists) {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
            } else {
              return 'לא נמצא משתמש';
            }
          })
        )
      )
      .pipe(take(1));
  }

  getCarNames(collectionName: string) {
    return this.afs
      .doc(collectionName + '/carNames')
      .valueChanges()
      .pipe(take(1));
  }

  checkIfCarExists(collectionName: string, carName: string) {
    const carData = this.afs.doc(collectionName + '/' + carName);
    let gatCarData = carData
      .get()
      .toPromise()
      .then(doc => {
        if (!doc.exists) {
          return false;
        } else {
          return true;
        }
      });
    return gatCarData;
  }

  async getRepCarDoc(collectionName: string, carName: string) {
    let docData;
    await this.afs
      .collection(`${collectionName}/${carName}/repCarCollection`)
      .ref.where('replacement.active', '==', true)
      .get()
      .then(val => {
        val.forEach(doc => {
          docData = doc.data();
        });
      });
    return docData;
  }

  getCarDoc(collectionName: string, carName: string) {
    return this.afs.doc(collectionName + '/' + carName).valueChanges();
  }

  updataCarData(
    collectionName: string,
    carName: string,
    newCarData: carModule
  ) {
    this.afs.doc(collectionName + '/' + carName).update(newCarData);
  }

  updataLastTripnoCar(
    collectionName: string,
    carName: string,
    lastTrip: tripModule
  ) {
    this.afs
      .doc(collectionName + '/' + carName)
      .update({
        lastTrip: lastTrip
      })
      .then(val => {
        console.log('lastTrip successfully updated!', val);
      });
    // TODO:להוריד את הלוג
  }

  getLastTrip(lastTripDate: Date) {
    return this.afs
      .collection('רישום נסיעות', ref =>
        ref.where('dateAndTime', '==', lastTripDate)
      )
      .snapshotChanges()
      .pipe(take(1))
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  fiXLastTripnoDB(id: string, lastTrip: tripModule) {
    this.afs
      .collection('רישום נסיעות')
      .doc(id)
      .update(lastTrip);
  }

  getPasNames() {
    return this.afs
      .collection('general')
      .doc('pasNames')
      .valueChanges();
  }

  setPasNamesinGeneralDatainFB(val: string) {
    this.afs.doc('general/general').set(
      {
        pasNames: val
      },
      { merge: true }
    );
  }

  getGeneralDataFormFB() {
    return this.afs
      .doc('general/general')
      .valueChanges()
      .pipe(take(1));
  }

  setTripToDB(tripData: tripModule) {
    this.afs
      .collection('רישום נסיעות')
      .add(tripData)
      .then(function(docRef) {
        console.log('Document written with ID: ', docRef.id);
        return docRef.id;
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
    // TODO:לטפל תטעות ולהוריד את קונסול לוג
  }

  getPasCircleOfBelonging(pasName: string) {
    return this.afs
      .collection('users', ref => ref.where('displayName', '==', pasName))
      .snapshotChanges()
      .pipe(take(1))
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data();
            return data['circleOfBelonging'];
          })
        )
      );
  }
  updateContinuedCurrentTripNoCar(
    collectionName: string,
    carName: string,
    newCurrentTrip: tripModule
  ) {
    this.afs.doc(collectionName + '/' + carName).update({
      currentTrip: {
        driver: {
          name: newCurrentTrip.driver.name,
          bill: {
            paidByOrganization: newCurrentTrip.driver.bill.paidByOrganization,
            nameOfBill: newCurrentTrip.driver.bill.nameOfBill
          },
          circleOfBelonging: newCurrentTrip.driver.circleOfBelonging
        },
        pas2: {
          name: newCurrentTrip.pas2.name,
          bill: {
            paidByOrganization: newCurrentTrip.pas2.bill.paidByOrganization,
            nameOfBill: newCurrentTrip.pas2.bill.nameOfBill
          },
          circleOfBelonging: newCurrentTrip.pas2.circleOfBelonging
        },
        pas3: {
          name: newCurrentTrip.pas3.name,
          bill: {
            paidByOrganization: newCurrentTrip.pas3.bill.paidByOrganization,
            nameOfBill: newCurrentTrip.pas3.bill.nameOfBill
          },
          circleOfBelonging: newCurrentTrip.pas3.circleOfBelonging
        },
        pas4: {
          name: newCurrentTrip.pas4.name,
          bill: {
            paidByOrganization: newCurrentTrip.pas4.bill.paidByOrganization,
            nameOfBill: newCurrentTrip.pas4.bill.nameOfBill
          },
          circleOfBelonging: newCurrentTrip.pas4.circleOfBelonging
        },
        pas5: {
          name: newCurrentTrip.pas5.name,
          bill: {
            paidByOrganization: newCurrentTrip.pas5.bill.paidByOrganization,
            nameOfBill: newCurrentTrip.pas5.bill.nameOfBill
          },
          circleOfBelonging: newCurrentTrip.pas5.circleOfBelonging
        },
        pas6: {
          name: newCurrentTrip.pas6.name,
          bill: {
            paidByOrganization: newCurrentTrip.pas6.bill.paidByOrganization,
            nameOfBill: newCurrentTrip.pas6.bill.nameOfBill
          },
          circleOfBelonging: newCurrentTrip.pas6.circleOfBelonging
        },
        pas7: {
          name: newCurrentTrip.pas7.name,
          bill: {
            paidByOrganization: newCurrentTrip.pas7.bill.paidByOrganization,
            nameOfBill: newCurrentTrip.pas7.bill.nameOfBill
          },
          circleOfBelonging: newCurrentTrip.pas7.circleOfBelonging
        },
        startKM: newCurrentTrip.endKM
      }
    });
  }

  resetCurrentTripnoCar(
    collectionName: string,
    carName: string,
    startKM: number
  ) {
    this.afs
      .doc(collectionName + '/' + carName)
      .update({
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
          startKM: startKM
        }
      })
      .then(val => {
        console.log('Document successfully updated!', val);
      });
    // TODO: להוריד את הקונסול לוג
  }

  saveOccCarDetails(occCarDetails: carModule) {
    occCarDetails.occasional.endDateInFleet = new Date();
    occCarDetails.occasional.endKMinFleet = occCarDetails.lastTrip['endKM'];
    this.afs
      .collection(`/משעול-מזדמן/${occCarDetails.name}/oldOccCar`)
      .add(occCarDetails)
      .then(function(docRef) {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
  }

  removeCarFromCarNames(carName: string, collectionOfCar: string) {
    let names = [];
    const carNamesRef: AngularFirestoreDocument = this.afs.doc(
      `${collectionOfCar}/carNames`
    );
    carNamesRef
      .get()
      .toPromise()
      .then(val => {
        names = val.data().carNames;
        for (var i = 0; i < names.length; i++) {
          if (names[i] == carName) {
            names.splice(i, 1);
            i--;
          }
        }
        names.sort();
        carNamesRef.set({ carNames: names });
      });
    // TODO: לתפוס תעות בהבטחה
  }

  addCarToCarNames(carName: string, collectionOfCar: string) {
    let names = [];
    const carNamesRef: AngularFirestoreDocument = this.afs.doc(
      `${collectionOfCar}/carNames`
    );
    carNamesRef
      .get()
      .toPromise()
      .then(val => {
        names = val.data().carNames;
        if (!names.includes(carName)) {
          names.push(carName);
          names.sort();
          carNamesRef.set({ carNames: names });
        }
      });
    // TODO: לתפוס תעות בהבטחה
  }

  addOccCarToCarNames(name: string, displayName: string) {
    let names = [];
    const carNamesRef: AngularFirestoreDocument = this.afs.doc(
      `משעול-מזדמן/carNames`
    );
    carNamesRef
      .get()
      .toPromise()
      .then(val => {
        names = val.data().carNames;
        const arrOccCarName = [];
        for (let i = 0; i < names.length; i++) {
          const element = names[i].split(':');
          arrOccCarName.push(element[0]);
        }
        if (!arrOccCarName.includes(name)) {
          names.push(displayName);
        } else {
          const index = arrOccCarName.findIndex(carName => carName === name);
          names[index] = displayName;
        }
        console.log(names);
        names.sort();
        carNamesRef.set({ carNames: names });
      });
    // TODO: לתפוס תעות בהבטחה
  }

  addRepCarToCarNames(
    collectionOfCar: string,
    displayRpeCarName: string,
    replacingCar: string
  ) {
    let names = [];
    const carNamesRef: AngularFirestoreDocument = this.afs.doc(
      `${collectionOfCar}/carNames`
    );
    carNamesRef
      .get()
      .toPromise()
      .then(val => {
        names = val.data().carNames;
        const index = names.findIndex(carName => carName === replacingCar);
        names[index] = displayRpeCarName;
        console.log(names);
        carNamesRef.set({ carNames: names });
      });
    // TODO: לתפוס תעות בהבטחה
  }

  saveRepCarInConsCar(collectionTOSaveIn: string, carData: carModule) {
    this.afs
      .collection(collectionTOSaveIn)
      .doc(`${carData.replacement.endDateInFleet}`)
      .set(carData)
      .then(function(docRef) {
        console.log('Document written with ID: ');
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
    this.addRepCarToCarNames(
      carData.replacement.replacingCarCollection,
      carData.replacement.replacingCar,
      carData.displayName
    );
  }
}
