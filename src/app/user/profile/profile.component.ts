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
import { MatIconRegistry } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take, startWith, map, tap } from 'rxjs/operators';
import { DataFBService } from 'src/app/services/data-fb.service';

import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  ifChild = false;
  isFirstTime = false;
  myControl = new FormControl();
  mainBillsSelected: string;
  collectionOfCarFromDB: string[];
  filteredOptions: Observable<string[]>;
  biilNames: string[];
  listOfName: string[];
  initialData = this.fb.group({
    displayName: ['', Validators.required],
    defaultCollectionOfCar: ['', Validators.required],
    circleOfBelonging: ['', Validators.required],
    mainBills: ['', Validators.required],
    constTrips: ['']
  });
  @ViewChild(MatInput, { static: false }) matInput: MatInput;

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
    private router: Router,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'cancel_outline',
      sanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/outline-cancel-24px.svg'
      )
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.listOfName.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }

  ngOnInit() {
    this.dataFBService.getGeneralDataFormFB().subscribe(val => {
      this.collectionOfCarFromDB = val['carCollection'];
      this.biilNames = val['arrBillNames'];
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
    } else if (this.router.url.includes('child')) {
      this.addChild();
    } else {
      this.getUserData();
    }
  }

  addChild() {
    this.initialData.patchValue({
      displayName: '',
      defaultCollectionOfCar: 'ילדים',
      circleOfBelonging: '',
      mainBills: '',
      constTrips: []
    });
    this.ifChild = true;
  }

  saveChildDataAndBack() {
    const data = {
      displayName: this.initialData.value.displayName,
      defaultCollectionOfCar: this.initialData.value.defaultCollectionOfCar,
      circleOfBelonging: this.initialData.value.circleOfBelonging,
      mainBills: this.initialData.value.mainBills,
      constTrips: [],
      canEditCar: false,
      uid: this.initialData.value.displayName,
      email: 'אין'
    };
    this.auth.addChildToDataBase(data);
    this.router.navigate(['/main-from']);
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
          if (this.ifChild) {
            this.saveChildDataAndBack();
          } else {
            this.saveUserDataAndBack();
          }
        });
    } else {
      if (this.ifChild) {
        this.saveChildDataAndBack();
      } else {
        this.saveUserDataAndBack();
      }
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
    if (this.initialData.invalid) {
      const invalidForm = this.snackBar.open(`טופס לא תקין`, '', {
        verticalPosition: 'top',
        duration: 3000
      });
    } else {
      this.checkNameInList(this.initialData.value.displayName);
    }
  }
}
