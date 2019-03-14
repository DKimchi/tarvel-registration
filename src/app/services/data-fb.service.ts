import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
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
          console.log('לא במערכת של  data');
          return false;
        } else {
          console.log('cngrf,.');
          return true;
        }
      });
    console.log(gatCarData);
    return gatCarData;
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
      .then(function() {
        console.log('lastTrip successfully updated!');
      });
    // TODO:להוריד את הלוג
  }

  getLastTrip(lastTripDate: Date) {
    return this.afs
      .collection('רישום נסיעות', ref =>
        ref.where('dateAndTime', '==', lastTripDate)
      )
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      )
      .pipe(take(1));
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
      .then(() => {
        console.log('Document successfully updated!');
      });
    // TODO: להוריד את הקונסול לוג
  }
}
