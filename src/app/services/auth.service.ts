import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user-module';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    // Get the auth state, then fetch the Firestore user document or return null
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    console.log(credential);
    return this.updateUserData(credential.user);
  }

  public updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data = {
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      displayName: user.displayName,
      defaultCollectionOfCar: user.defaultCollectionOfCar,
      mainBills: user.mainBills,
      circleOfBelonging: user.circleOfBelonging,
      constTrips: user.constTrips,
      canEditCar: user.canEditCar
    };

    return userRef.set(data, { merge: true });
  }

  addChildToDataBase(user: User) {
    let newCityRef = this.afs
      .collection('users')
      .doc<User>(user.displayName)
      .set(user);
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

  updateToken(user: User, token: string) {


    const currentTokens: Array<string> = user.fcmTokens || [];

    // If token does not exist in firestore, update db
    if (!currentTokens.includes(token)) {
      const userRef = this.afs.collection('users').doc(user.uid);
      const tokens = [...currentTokens, token];
      userRef.update({ fcmTokens: tokens });
    }
  }
}
