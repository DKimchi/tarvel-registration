import { Component, OnInit, Inject } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import {
  FormControl,
  Validators,
  AbstractControl,
  FormGroup,
  FormBuilder,
  FormArray
} from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { take } from 'rxjs/operators';
import { DataFBService } from 'src/app/services/data-fb.service';
import { validateArgCount } from '@firebase/util';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  mainBillsSelected: string;
  collectionOfCarFromDB: string[];
  biilNames: string[];
  listOfName: string[];
  firstTime = false;
  initialData = this.fb.group({
    displayName: ['', Validators.required],
    defaultCollectionOfCar: ['', Validators.required],
    circleOfBelonging: ['', Validators.required],
    mainBills: ['', Validators.required]
  });

  get mainBills() {
    return this.initialData.get('mainBills') as FormArray;
  }
  get constTrips() {
    return this.initialData.get('constTrips') as FormArray;
  }
  constructor(
    public dataFBService: DataFBService,
    public auth: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.dataFBService.getGeneralDataFormFB().subscribe(val => {
      this.collectionOfCarFromDB = val['carCollection'];
      this.biilNames = val['billNames'].split(',');
      this.listOfName = val['pasNames'].split(',');
    });
    this.getUserData();
  }

  getUserData() {
    this.auth.user$.subscribe(val =>
      this.initialData.patchValue({
        displayName: val.displayName,
        defaultCollectionOfCar: val.defaultCollectionOfCar,
        circleOfBelonging: val.circleOfBelonging,
        mainBills: val.mainBills
      })
    );
  }

  test() {
    console.log('משהו');
  }

  checkNameinList(name: string) {
    if (!this.listOfName.includes(name)) {
      this.listOfName.push(name);
      this.listOfName.sort();
      this.dataFBService.setPasNamesinGeneralDatainFB(
        this.listOfName.toString()
      );
    }
  }

  initConstTrip() {
    return this.fb.group({
      name: this.fb.control(''),
      drive: this.fb.group({
        name: [''],
        bill: ['']
      }),
      Passengers: this.fb.array([
        this.fb.group({
          name: [''],
          bill: ['']
        })
      ])
    });
  }

  addConstTrip(control) {
    control.push(this.initConstTrip());
  }

  addBillToMainBills() {
    this.mainBills.push(this.fb.control(''));
  }

  onSubmit() {
    this.auth.user$.pipe(take(1)).subscribe(val => {
      this.checkNameinList(this.initialData.value.displayName);
      val.displayName = this.initialData.value.displayName;
      val.defaultCollectionOfCar = this.initialData.value.defaultCollectionOfCar;
      val.circleOfBelonging = this.initialData.value.circleOfBelonging;
      val.mainBills = this.initialData.value.mainBills;
      this.auth.updateUserData(val);
      this.router.navigate(['/main-from']);
    });
  }
}
