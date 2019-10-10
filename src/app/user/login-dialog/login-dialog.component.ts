import { Component, OnInit, Inject } from '@angular/core';
import { AuthProvider } from 'ngx-auth-firebaseui';

import { AuthService } from '../../services/auth.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { User } from 'src/app/models/user-module';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'login-dialog',
  templateUrl: 'login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
// tslint:disable-next-line:component-class-suffix
export class LoginDialogComponent {
  providers = AuthProvider;
  hide = true;
  firstTime: boolean;
  constructor(
    private afAuth: AngularFireAuth,
    public auth: AuthService,
    private snackBar: MatSnackBar,
    private afs: AngularFirestore,
    public dialogEmailRef: MatDialogRef<LoginDialogComponent>,
    private router: Router
  ) { }

  onNoClick(): void {
    this.dialogEmailRef.close();
  }

  printUser(event) {
    this.auth.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          if (user.metadata.creationTime === user.metadata.lastSignInTime) {
            this.firstTime = true;
          } else {
            this.firstTime = false;
          }
          this.dialogEmailRef.close(this.firstTime);
          return this.afs.doc<User>(`users/${event.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );
  }

  printError(event) {
    this.snackBar.open('מייל/סיסמה לא נכונים. נסה שוב', '', {
      verticalPosition: 'top',
      duration: 3000
    });
  }
}
