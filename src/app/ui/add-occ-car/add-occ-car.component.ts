import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { carModule } from 'src/app/models/car-module';
import { CarDataService } from 'src/app/services/car-data.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MessagingService } from '../../services/messaging.service';
import { AuthService } from '../../services/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-add-occ-car',
  templateUrl: './add-occ-car.component.html',
  styleUrls: ['./add-occ-car.component.scss']
})
export class AddOccCarComponent implements OnInit {
  myName: string;
  occCarNumber: number;
  occcardata: carModule = {
    openRegistration: null,
    whereToRegister: '',
    name: '',
    typeOfCar: '',
    typename: '',
    responsible: 'צב התנועה',
    carPayBy: 'משעול',
    lastRegister: '',
    lastTrip: {
      openRegistration: null,
      whereToRegister: '',
      carName: '',
      monthBill: '',
      dateAndTime: null,
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
    collectionOfCar: 'משעול-מזדמן',
    rentCompany: {
      name: 'ליס4יו',
      tel: '*8668'
    },
    sevenPasCar: false,
    carNumber: '',
    code: '',
    registerOn: 'משעול',
    permissibletoDrive: 'מעל גיל 21 ושנתיים וותק רשיון',
    occasional: {
      startDateInFleet: null,
      endDateInFleet: null,
      startKMinFleet: null,
      endKMinFleet: null
    },
    startKMinFleet: null
  };

  newOccCarData = this.fb.group({
    occCarNumber: ['', Validators.required],
    typeName: ['', Validators.required],
    carNumber: [
      '',
      [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(8),
        Validators.pattern('^[0-9]*$')
      ]
    ],
    code: ['', Validators.required],
    startKMinFleet: ['', Validators.required]
  });
  constructor(
    private fb: FormBuilder,
    private carDataService: CarDataService,
    private router: Router,
    private fcm: MessagingService,
    private auth: AuthService,
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

  ngOnInit() {
    this.auth.user$.pipe(take(1)).subscribe(val => {
      this.myName = val['displayName']
    })
  }


  getErrorMessageForCarNumber() {
    return this.newOccCarData.controls.carNumber.hasError('required')
      ? 'חייב להכניס מספר רכב'
      : this.newOccCarData.controls.carNumber.hasError('pattern')
        ? 'חייב להיות 7 או 8 ספרות בלבד'
        : this.newOccCarData.controls.carNumber.hasError('minlength')
          ? 'חייב להיות 7 או 8 ספרות בלבד'
          : '';
  }
  onSubmit() {
    if (this.newOccCarData.valid) {
      const ArrCarNumber = Array.from(this.newOccCarData.value.carNumber);
      let displayCarNumber;
      if (ArrCarNumber.length === 7) {
        displayCarNumber = `${ArrCarNumber[0]}${ArrCarNumber[1]}-${ArrCarNumber[2]
          }${ArrCarNumber[3]}${ArrCarNumber[4]}-${ArrCarNumber[5]}${ArrCarNumber[6]
          }`;
      } else if (ArrCarNumber.length === 8) {
        displayCarNumber = `${ArrCarNumber[0]}${ArrCarNumber[1]}${ArrCarNumber[2]
          }-${ArrCarNumber[3]}${ArrCarNumber[4]}-${ArrCarNumber[5]}${ArrCarNumber[6]
          }${ArrCarNumber[7]}`;
      }
      this.occcardata.collectionOfCar = 'משעול-מזדמן';
      this.occcardata.name = `רכב מזדמן ${this.newOccCarData.value.occCarNumber
        }`;
      this.occcardata.displayName = `רכב מזדמן ${this.newOccCarData.value.occCarNumber
        }: ${this.newOccCarData.value.typeName} - ${displayCarNumber}`;
      this.occcardata.carNumber = this.newOccCarData.value.carNumber;
      this.occcardata.code = this.newOccCarData.value.code;
      this.occcardata.whereToRegister = 'משעול';
      this.occcardata.typename = this.newOccCarData.value.typeName;
      this.occcardata.occasional[
        'startKMinFleet'
      ] = this.newOccCarData.value.startKMinFleet;
      this.occcardata.currentTrip[
        'startKM'
      ] = this.newOccCarData.value.startKMinFleet;
      this.occcardata.startKMinFleet = this.newOccCarData.value.startKMinFleet;
      this.occcardata.occasional['startDateInFleet'] = new Date();
      this.occcardata.lastTrip.dateAndTime = new Date();
      this.occcardata.currentTrip['driver']['name'] = '';
      console.log(this.occcardata);
      const time = new Date();
      const message = {
        "title": `שכרתי ${this.occcardata.name}`,
        "body": `שם: ${this.myName}, זמן פתיחת מזדמן: ${time.toLocaleTimeString()}`,
        "icon": './assets/icons/favicon.ico'
      };
      this.fcm.sendMessageToUsher(message);
      this.carDataService.updateOccCarData(this.occcardata);
      this.carDataService.dataForCarSelected(this.occcardata);
      this.carDataService.changeTextName();
      this.carDataService.carChosen = true;
      this.router.navigate(['/main-from']);

    }
  }
}
