import { Component, OnInit, Inject, ViewChild } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import {
  FormControl,
  Validators,
  AbstractControl,
  FormGroup,
  FormBuilder,
  FormArray
} from '@angular/forms';
import {
  MatSnackBar,
  MatAutocomplete,
  MatAutocompleteTrigger,
  MatInput
} from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { take, startWith, map, tap } from 'rxjs/operators';
import { DataFBService } from 'src/app/services/data-fb.service';

import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isFirstTime = false;
  myControl = new FormControl();
  mainBillsSelected: string;
  collectionOfCarFromDB: string[];
  filteredOptions: Observable<string[]>;
  biilNames: string[];
  listOfName: string[];
  firstTime = false;
  initialData = this.fb.group({
    displayName: ['', Validators.required],
    defaultCollectionOfCar: ['', Validators.required],
    circleOfBelonging: ['', Validators.required],
    mainBills: ['', Validators.required],
    constTrips: ['']
  });
  @ViewChild(MatInput) matInput: MatInput;

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
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.listOfName.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }

  ngOnInit() {
    this.dataFBService.getGeneralDataFormFB().subscribe(val => {
      this.collectionOfCarFromDB = val['carCollection'];
      this.biilNames = val['billNames'].split(',');
      this.listOfName = val['pasNames'].split(',');
      this.filteredOptions = this.initialData
        .get('displayName')
        .valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value))
        );
    });
    if (this.router.url.includes('firstTime')) {
      this.logInFirstTime();
    } else {
      this.getUserData();
    }
  }
  logInFirstTime() {
    this.initialData.patchValue({
      displayName: '',
      defaultCollectionOfCar: '',
      circleOfBelonging: '',
      mainBills: '',
      constTrips: ''
    });
    this.isFirstTime = true;
  }
  getUserData() {
    this.auth.user$.subscribe(val => {
      this.initialData.patchValue({
        displayName: val.displayName,
        defaultCollectionOfCar: val.defaultCollectionOfCar,
        circleOfBelonging: val.circleOfBelonging,
        mainBills: val.mainBills
      });
    });
  }

  test() {}

  checkNameInList(name: string) {
    if (!this.listOfName.includes(name)) {
      const addNameSnackBar = this.snackBar.open(
        `${this.initialData.value.displayName} לא ברשימת שמות`,
        'הוסף',
        {
          verticalPosition: 'top',
          duration: 4000
        }
      );
      addNameSnackBar
        .onAction()
        .pipe(take(1))
        .subscribe(() => {
          this.listOfName.push(name);
          this.listOfName.sort();
          this.dataFBService.setPasNamesinGeneralDatainFB(
            this.listOfName.toString()
          );
          this.saveUserDataAndBack();
        });
    } else {
      this.saveUserDataAndBack();
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

  saveUserDataAndBack() {
    this.auth.user$.pipe(take(1)).subscribe(val => {
      val.displayName = this.initialData.value.displayName;
      val.defaultCollectionOfCar = this.initialData.value.defaultCollectionOfCar;
      val.circleOfBelonging = this.initialData.value.circleOfBelonging;
      val.mainBills = this.initialData.value.mainBills;
      this.isFirstTime ? (val.constTrips = []) : val.constTrips;
      this.isFirstTime ? (val.canEditCar = false) : val.canEditCar;
      this.auth.updateUserData(val);
      this.router.navigate(['/main-from']);
    });
  }

  onSubmit() {
    this.checkNameInList(this.initialData.value.displayName);
  }
}
