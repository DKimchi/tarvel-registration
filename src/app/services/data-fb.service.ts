import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { carModule } from '../models/car-module';
import { tripModule } from '../models/trip-module';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class DataFBService {
  // tslint:disable-next-line:ban-types
  generalData: Object = {
    billNames: '',
    carCollection: [],
    InitialCode: '',
    pasNames: '',
    misholUsher: '',
    misholUsherTeam: [],
    testbillnames: Object
  };

  constructor(private afs: AngularFirestore) {
    this.getGeneralDataFormFB().toPromise().then(val => {
      this.generalData = val
    }).catch(err => {
      console.log('לא נמצא מידע כללי:' + err)
    });
  };

  getUsherTokens(name: string) { 
    return this.afs
      .collection('users', ref => ref.where('displayName', '==', name))
      .valueChanges()
      .pipe(take(1));
  }

  getUsherName() {
    return this.generalData['misholUsherTeam'];
  }

  getUsherNameTH(){
    return this.generalData['THUsherTeam'];
  }

  getUserConstTrip(constTripName) {
    return this.afs
      .doc(constTripName)
      .valueChanges()
      .pipe(take(1));
  }

  getUserData(userName: string) {
    return this.afs
      .collection('users', ref => ref.where('displayName', '==', userName))
      .valueChanges()
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
            return { id, data };
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
      .then(function (docRef) {
        console.log('Document written with ID: ', docRef.id);
        return docRef.id;
      })
      .catch(function (error) {
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
      openRegistration: new Date(),
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
        openRegistration: null,
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

  saveOccCarDetails(occCarDetails: carModule, endKM: number) {
    occCarDetails.occasional.endDateInFleet = new Date();
    occCarDetails.occasional.endKMinFleet = endKM;
    const readOccCar = this.afs.doc('/משעול-מזדמן/readOldOcc');
    this.afs
      .collection(`/משעול-מזדמן/${occCarDetails.name}/oldOccCar`)
      .add(occCarDetails)
      .then(function (docRef) {
        readOccCar.update({
          openOldOcc: firebase.firestore.FieldValue.arrayUnion(
            `משעול-מזדמן/${occCarDetails.name}/oldOccCar/${docRef.id}`
          )
        });
        console.log('Document written with ID: ', docRef.id);
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);
        //: TODO: לתפוס תעות ברישם פרטים של רכב מזדמן
      });
  }

  saveOccCarDetailsTH(occCarDetails: carModule, endKM: number) {
    occCarDetails.occasional.endDateInFleet = new Date();
    occCarDetails.occasional.endKMinFleet = endKM;
    const readOccCar = this.afs.doc('/תנועת הנוער-מזדמן/readOldOcc');
    this.afs
      .collection(`/תנועת הנוער-מזדמן/${occCarDetails.name}/oldOccCar`)
      .add(occCarDetails)
      .then(function (docRef) {
        readOccCar.update({
          openOldOcc: firebase.firestore.FieldValue.arrayUnion(
            `תנועת הנוער-מזדמן/${occCarDetails.name}/oldOccCar/${docRef.id}`
          )
        });
        console.log('Document written with ID: ', docRef.id);
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);
        //: TODO: לתפוס תעות ברישם פרטים של רכב מזדמן
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

  addOccCarToCarNames(displayName: string) {
    let names = [];
    const carNamesRef: AngularFirestoreDocument = this.afs.doc(
      `משעול-מזדמן/carNames`
    );
    carNamesRef
      .get()
      .toPromise()
      .then(val => {
        const arrOccCarNumber = [];
        names = val.data().carNames;
        names.forEach(val => {
          arrOccCarNumber.push(parseInt(val.slice(10, val.indexOf(':')), 10));
        });
        const newOccCarNumber = parseInt(
          displayName.slice(10, displayName.indexOf(':')),
          10
        );
        function sortNumber(a, b) {
          return a - b;
        }
        arrOccCarNumber.push(newOccCarNumber);
        arrOccCarNumber.sort(sortNumber);
        const index = arrOccCarNumber.findIndex(val => val === newOccCarNumber);
        names.splice(index, 0, displayName);
        carNamesRef.set({ carNames: names });
      });
    // TODO: לתפוס תעות בהבטחה
  }

  addOccCarToCarNamesTH(displayName: string) {
    let names = [];
    const carNamesRef: AngularFirestoreDocument = this.afs.doc(
      `תנועת הנוער-מזדמן/carNames`
    );
    carNamesRef
      .get()
      .toPromise()
      .then(val => {
        const arrOccCarNumber = [];
        names = val.data().carNames;
        names.forEach(val => {
          arrOccCarNumber.push(parseInt(val.slice(10, val.indexOf(':')), 10));
        });
        const newOccCarNumber = parseInt(
          displayName.slice(10, displayName.indexOf(':')),
          10
        );
        function sortNumber(a, b) {
          return a - b;
        }
        arrOccCarNumber.push(newOccCarNumber);
        arrOccCarNumber.sort(sortNumber);
        const index = arrOccCarNumber.findIndex(val => val === newOccCarNumber);
        names.splice(index, 0, displayName);
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
      .then(function (docRef) {
        console.log('Document written with ID: ');
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);
      });
    this.addRepCarToCarNames(
      carData.replacement.replacingCarCollection,
      carData.replacement.replacingCar,
      carData.displayName
    );
  }
}
