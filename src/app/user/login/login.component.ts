import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { take, map } from 'rxjs/operators';
import { DataFBService } from 'src/app/services/data-fb.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  InitialCodeFromDB: string;

  hide = true;

  initialCode = new FormControl('', [Validators.required]);
  firstTime = false;

  constructor(
    public dataFBService: DataFBService,
    public auth: AuthService,
    private snackBar: MatSnackBar,
    public dialogEmail: MatDialog,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.dataFBService.getGeneralDataFormFB().subscribe(val => {
      this.InitialCodeFromDB = val['InitialCode'];
    });
  }

  openDialogEmailsingin() {
    if (this.initialCode.value === '') {
      this.initialCode.markAsTouched();
    } else if (this.initialCode.value !== this.InitialCodeFromDB) {
      this.snackBar.open('קוד ראשוני שגוי, נסה שנית', '', {
        verticalPosition: 'top',
        duration: 3000
      });
    } else {
      const dialogEmailRef = this.dialogEmail.open(LoginDialogComponent);
      dialogEmailRef
        .afterClosed()
        .pipe(take(1))
        .subscribe(result => {
          // this.firstTime = result;
          console.log(result);
        });
      this.initialCode.setValue('');
      this.initialCode.markAsPending();
      this.initialCode.markAsUntouched();
    }
  }

  test() {
    // this.auth.user$.subscribe(val => {
    //   this.testVal = val;
    //   console.log(this.testVal);
    // });
  }
}
