import { Component, OnInit } from '@angular/core';

import { CarDataService } from 'src/app/services/car-data.service';
import { DataFBService } from 'src/app/services/data-fb.service';
import { tripModule } from 'src/app/models/trip-module';
import { carModule } from 'src/app/models/car-module';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogMessageComponent } from '../dialog-message/dialog-message.component';
import { AudioService } from 'src/app/services/audio.service';
import { MessagingService } from 'src/app/services/messaging.service';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-end-trip',
  templateUrl: './end-trip.component.html',
  styleUrls: ['./end-trip.component.scss']
})
export class EndTripComponent implements OnInit {
  arrBillName = [];
  arrPaidByOrganizations = [];
  myName: string;
  isContinuedTrip = false;
  isOccCarReturn = false;
  isOccCarReturnTH = false;
  soundNo = true;
  collectionOfCar: string;
  endKM: number = null;
  // : Observable<any>;
  carData: carModule;

  endTripData: tripModule = {
    openRegistration: null,
    whereToRegister: '',
    carName: '',
    monthBill: '',
    dateAndTime: new Date(),
    startKM: null,
    endKM: null,
    carPayBy: '',
    carResponsible: '',
    carNumber: '',
    collectionOfCar: '',
    numberOfPas: 1,
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
  };

  constructor(
    private dialogMessage: MatDialog,
    public carDataService: CarDataService,
    public dataFBService: DataFBService,
    private fcm: MessagingService,
    private snackBar: MatSnackBar,
    private auth: AuthService,
    public audioService: AudioService
  ) { }

  ngOnInit() {
    this.carDataService.currentCarData.subscribe(val => {
      this.carData = val;
      this.collectionOfCar = val.collectionOfCar;
    });
    this.auth.user$.pipe(take(1)).subscribe(val => {
      this.myName = val['displayName']
    })
    this.dataFBService.getGeneralDataFormFB().pipe(take(1)).subscribe(val => {
      this.arrPaidByOrganizations = val['arrPaidByOrganizations'];
      this.arrBillName = val['arrBillNames'];
    });
  }

  changeEndKM(e) {
    this.endKM = Number(e.target.value);
  }

  async setCircleOfBelonging() {
    for (let index = 1; index <= 7; index++) {
      let pas = '';
      if (index === 1) {
        pas = 'driver';
      } else {
        pas = 'pas' + index;
      }
      if (this.carData['currentTrip'][pas].name !== '') {
        const pasName = this.carData['currentTrip'][pas].name;
        await this.dataFBService
          .getPasCircleOfBelonging(pasName)
          .toPromise()
          .then(CircleOfBelonging => {
            if (CircleOfBelonging[0]) {
              this.carData['currentTrip'][pas]['circleOfBelonging'] =
                CircleOfBelonging[0];
            } else {
              this.carData['currentTrip'][pas]['circleOfBelonging'] =
                'מעגל שייכות לא הוגדר';
            }
            console.log(
              'מעגל שייכות',
              this.carData['currentTrip'][pas]['circleOfBelonging']
            );
          })
          // TODO: להוריד את הבןסול לוג
          .catch(err => {
            this.carData['currentTrip'][pas]['circleOfBelonging'] =
              'מעגל שייכות לא הוגדר';
            console.log(err);
          });
      }
    }
  }

  returnOccCar() {
    this.isOccCarReturn = true;
    console.log('החזרה רכב');
    this.endTrip();
  }
  returnOccCarTH() {
    this.isOccCarReturnTH = true;
    console.log('החזרה רכב');
    this.endTrip();
  }

  setPaidByOrganization() {
    for (let index = 1; index <= 7; index++) {
      let pas = '';
      if (index === 1) {
        pas = 'driver';
      } else {
        pas = 'pas' + index;
      }
      const indexBillName = this.arrBillName.indexOf(this.carData['currentTrip'][pas]['bill']['nameOfBill']);
      if (indexBillName !== -1) {
        this.carData['currentTrip'][pas]['bill']['paidByOrganization'] = this.arrPaidByOrganizations[indexBillName];
      } else {
        this.carData['currentTrip'][pas]['bill']['paidByOrganization'] = '';
      }
    }
  }

  closeAndContinuedTrip() {
    this.isContinuedTrip = true;
    this.endTrip();
  }
  // TODO: למחוק פינקציה test

  async endTrip() {
    await this.setCircleOfBelonging();
    await this.setPaidByOrganization();
    this.endTripData.dateAndTime = new Date();
    this.endTripData = {
      openRegistration: this.carData['openRegistration'],
      whereToRegister: this.carData['whereToRegister'],
      dateAndTime: new Date(),
      carName: this.carData['name'],
      monthBill: `${this.endTripData.dateAndTime.getMonth() +
        1}/${this.endTripData.dateAndTime.getFullYear()}`,
      startKM: Math.round(this.carData['currentTrip']['startKM']),
      endKM: Math.round(this.endKM),
      carPayBy: this.carData.carPayBy,
      carResponsible: this.carData.responsible,
      carNumber: this.carData.carNumber,
      collectionOfCar: this.carData.collectionOfCar,
      numberOfPas: 1,
      driver: {
        name: this.carData['currentTrip']['driver']['name'],
        bill: {
          paidByOrganization: this.carData['currentTrip']['driver']['bill'][
            'paidByOrganization'
          ],

          nameOfBill: this.carData['currentTrip']['driver']['bill'][
            'nameOfBill'
          ]
        },
        circleOfBelonging: this.carData['currentTrip']['driver'][
          'circleOfBelonging'
        ]
      },
      pas2: {
        name: this.carData['currentTrip']['pas2']['name'],
        bill: {
          paidByOrganization: this.carData['currentTrip']['pas2']['bill'][
            'paidByOrganization'
          ],
          nameOfBill: this.carData['currentTrip']['pas2']['bill']['nameOfBill']
        },
        circleOfBelonging: this.carData['currentTrip']['pas2'][
          'circleOfBelonging'
        ]
      },
      pas3: {
        name: this.carData['currentTrip']['pas3']['name'],
        bill: {
          paidByOrganization: this.carData['currentTrip']['pas3']['bill'][
            'paidByOrganization'
          ],
          nameOfBill: this.carData['currentTrip']['pas3']['bill']['nameOfBill']
        },
        circleOfBelonging: this.carData['currentTrip']['pas3'][
          'circleOfBelonging'
        ]
      },
      pas4: {
        name: this.carData['currentTrip']['pas4']['name'],
        bill: {
          paidByOrganization: this.carData['currentTrip']['pas4']['bill'][
            'paidByOrganization'
          ],
          nameOfBill: this.carData['currentTrip']['pas4']['bill']['nameOfBill']
        },
        circleOfBelonging: this.carData['currentTrip']['pas4'][
          'circleOfBelonging'
        ]
      },
      pas5: {
        name: this.carData['currentTrip']['pas5']['name'],
        bill: {
          paidByOrganization: this.carData['currentTrip']['pas5']['bill'][
            'paidByOrganization'
          ],
          nameOfBill: this.carData['currentTrip']['pas5']['bill']['nameOfBill']
        },
        circleOfBelonging: this.carData['currentTrip']['pas5'][
          'circleOfBelonging'
        ]
      },
      pas6: {
        name: this.carData['currentTrip']['pas6']['name'],
        bill: {
          paidByOrganization: this.carData['currentTrip']['pas6']['bill'][
            'paidByOrganization'
          ],
          nameOfBill: this.carData['currentTrip']['pas6']['bill']['nameOfBill']
        },
        circleOfBelonging: this.carData['currentTrip']['pas6'][
          'circleOfBelonging'
        ]
      },
      pas7: {
        name: this.carData['currentTrip']['pas7']['name'],
        bill: {
          paidByOrganization: this.carData['currentTrip']['pas7']['bill'][
            'paidByOrganization'
          ],
          nameOfBill: this.carData['currentTrip']['pas7']['bill']['nameOfBill']
        },
        circleOfBelonging: this.carData['currentTrip']['pas7'][
          'circleOfBelonging'
        ]
      }
    };
    console.log(this.carData);
    if (this.endTripData.carName === '') {
      this.snackBar.open('לא נבחר רכב', '', {
        verticalPosition: 'top',
        duration: 2000
      });

      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (this.endTripData.startKM == null) {
      this.isContinuedTrip = false;
      this.snackBar.open('חסר ק"מ פתיחה', '', {
        verticalPosition: 'top',
        duration: 2000
      });

      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (this.endTripData.endKM == null) {
      this.isContinuedTrip = false;
      this.snackBar.open('חסר ק"מ סיום', '', {
        verticalPosition: 'top',
        duration: 2000
      });
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (this.endTripData.driver['name'] === '') {
      this.isContinuedTrip = false;
      this.snackBar.open('לא נבחר שם נהג', '', {
        verticalPosition: 'top',
        duration: 2000
      });
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (this.endTripData.driver['bill']['nameOfBill'] === '') {
      this.isContinuedTrip = false;
      this.snackBar.open('לא נבחר חשבון נהג', '', {
        verticalPosition: 'top',
        duration: 2000
      });
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (this.endTripData.startKM > this.endTripData.endKM) {
      this.isContinuedTrip = false;
      this.snackBar.open('ק"מ פתיחה לא יכול להיות יותר מק"מ סיום', '', {
        verticalPosition: 'top',
        duration: 2000
      });
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (
      this.endTripData.pas2['name'] === '' &&
      this.endTripData.pas2['bill']['nameOfBill'] !== ''
    ) {
      this.isContinuedTrip = false;
      this.snackBar.open('חסר שם לנוסע 2', '', {
        verticalPosition: 'top',
        duration: 2000
      });
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (
      this.endTripData.pas2['bill']['nameOfBill'] === '' &&
      this.endTripData.pas2['name'] !== ''
    ) {
      this.isContinuedTrip = false;
      this.snackBar.open('חסר יעד חיוב לנוסע 2', '', {
        verticalPosition: 'top',
        duration: 2000
      });
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (
      this.endTripData.pas3['name'] === '' &&
      this.endTripData.pas3['bill']['nameOfBill'] !== ''
    ) {
      this.isContinuedTrip = false;
      this.snackBar.open('חסר שם לנוסע 3', '', {
        verticalPosition: 'top',
        duration: 2000
      });
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (
      this.endTripData.pas3['bill']['nameOfBill'] === '' &&
      this.endTripData.pas3['name'] !== ''
    ) {
      this.isContinuedTrip = false;
      this.snackBar.open('חסר יעד חיוב לנוסע 3', '', {
        verticalPosition: 'top',
        duration: 2000
      });
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (
      this.endTripData.pas4['name'] === '' &&
      this.endTripData.pas4['bill']['nameOfBill'] !== ''
    ) {
      this.isContinuedTrip = false;
      this.snackBar.open('חסר שם לנוסע 4', '', {
        verticalPosition: 'top',
        duration: 2000
      });
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (
      this.endTripData.pas4['bill']['nameOfBill'] === '' &&
      this.endTripData.pas4['name'] !== ''
    ) {
      this.isContinuedTrip = false;
      this.snackBar.open('חסר יעד חיוב לנוסע 4', '', {
        verticalPosition: 'top',
        duration: 2000
      });
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (
      this.endTripData.pas5['name'] === '' &&
      this.endTripData.pas5['bill']['nameOfBill'] !== ''
    ) {
      this.isContinuedTrip = false;
      this.snackBar.open('חסר שם לנוסע 5', '', {
        verticalPosition: 'top',
        duration: 2000
      });
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (
      this.endTripData.pas5['bill']['nameOfBill'] === '' &&
      this.endTripData.pas5['name'] !== ''
    ) {
      this.isContinuedTrip = false;
      this.snackBar.open('חסר יעד חיוב לנוסע 5', '', {
        verticalPosition: 'top',
        duration: 2000
      });
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (
      this.endTripData.pas6['name'] === '' &&
      this.endTripData.pas6['bill']['nameOfBill'] !== ''
    ) {
      this.isContinuedTrip = false;
      this.snackBar.open('חסר שם לנוסע 6', '', {
        verticalPosition: 'top',
        duration: 2000
      });
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (
      this.endTripData.pas6['bill']['nameOfBill'] === '' &&
      this.endTripData.pas6['name'] !== ''
    ) {
      this.isContinuedTrip = false;
      this.snackBar.open('חסר יעד חיוב לנוסע 6', '', {
        verticalPosition: 'top',
        duration: 2000
      });
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (
      this.endTripData.pas7['name'] === '' &&
      this.endTripData.pas7['bill']['nameOfBill'] !== ''
    ) {
      this.isContinuedTrip = false;
      this.snackBar.open('חסר שם לנוסע 7', '', {
        verticalPosition: 'top',
        duration: 2000
      });
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (
      this.endTripData.pas7['bill']['nameOfBill'] === '' &&
      this.endTripData.pas7['name'] !== ''
    ) {
      this.isContinuedTrip = false;
      this.snackBar.open('חסר יעד חיוב לנוסע 7', '', {
        verticalPosition: 'top',
        duration: 2000
      });
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else {
      if (
        this.endTripData.pas2['name'] !== '' &&
        this.endTripData.pas2['bill']['nameOfBill'] !== ''
      ) {
        this.endTripData.numberOfPas += 1;
      }
      if (
        this.endTripData.pas3['name'] !== '' &&
        this.endTripData.pas3['bill']['nameOfBill'] !== ''
      ) {
        this.endTripData.numberOfPas += 1;
      }
      if (
        this.endTripData.pas4['name'] !== '' &&
        this.endTripData.pas4['bill']['nameOfBill'] !== ''
      ) {
        this.endTripData.numberOfPas += 1;
      }
      if (
        this.endTripData.pas5['name'] !== '' &&
        this.endTripData.pas5['bill']['nameOfBill'] !== ''
      ) {
        this.endTripData.numberOfPas += 1;
      }
      if (
        this.endTripData.pas6['name'] !== '' &&
        this.endTripData.pas6['bill']['nameOfBill'] !== ''
      ) {
        this.endTripData.numberOfPas += 1;
      }
      if (
        this.endTripData.pas7['name'] !== '' &&
        this.endTripData.pas7['bill']['nameOfBill'] !== ''
      ) {
        this.endTripData.numberOfPas += 1;
      }
      const tripKM = this.endTripData.endKM - this.endTripData.startKM;
      let messageName: string;
      let panelClass: string = null
      if (tripKM < 500) {
        messageName = 'confirmedTrip';
      } else {
        messageName = 'confirmedLongTrip';
        panelClass = 'confirmedLongTrip'
        this.audioService.playAudio('longTrip');
      }
      const dialogPasName = this.dialogMessage.open(DialogMessageComponent, {
        maxWidth: 400,
        data: {
          endTripData: this.endTripData,
          messageName: messageName,
          tripKM: tripKM
        },
        autoFocus: false,
        panelClass: panelClass
        // TODO: חזרה אחורה בטלפון תסגור את הדיאלוג
      });

      dialogPasName.afterClosed().subscribe(confirmTrip => {
        if (confirmTrip) {
          this.registrationToDB();
        } else {
          this.resetEndTripData();
          this.isContinuedTrip = false;
          this.snackBar.open('רישום נסיעה בוטל', '', {
            verticalPosition: 'top',
            duration: 2000
          });
        }
      });
    }
  }

  soundNoButClick() {
    this.audioService.isCanPlay = !this.audioService.isCanPlay;
    localStorage.setItem('isCanPlay', `${this.audioService.isCanPlay}`);
    // TODO: לשים קולות לסגרית פפתיח של נסיעה
  }

  registrationToDB() {
    if (
      this.carData.lastTrip['endKM'] &&
      this.endTripData.startKM !== this.carData.lastTrip['endKM']
    ) {
      const differenceBetweenTrips =
        this.endTripData.startKM - this.carData.lastTrip['endKM'];
      if (differenceBetweenTrips > 0 && differenceBetweenTrips <= 30) {
        let lastTripDB;
        this.dataFBService
          .getLastTrip(this.carData.lastTrip['dateAndTime'])
          .subscribe(data => {
            lastTripDB = data[0];
            lastTripDB['endKM'] += Math.ceil(differenceBetweenTrips / 2);
            this.endTripData['startKM'] -= Math.floor(
              differenceBetweenTrips / 2
            );
            this.dataFBService.fiXLastTripnoDB(lastTripDB['id'], lastTripDB);
            this.closeRegistrationTrip();
          });
      } else if (
        differenceBetweenTrips >= -30 &&
        differenceBetweenTrips < 0 &&
        this.endTripData['endKM'] >= this.carData.lastTrip['endKM']
      ) {
        this.endTripData['startKM'] -= differenceBetweenTrips;
        this.closeRegistrationTrip();
      } else if (
        differenceBetweenTrips >= -30 &&
        differenceBetweenTrips < 0 &&
        this.endTripData['endKM'] < this.carData.lastTrip['endKM']
      ) {
        let lastTripDB;
        this.dataFBService
          .getLastTrip(this.carData.lastTrip['dateAndTime'])
          .subscribe(data => {
            lastTripDB = data[0];
            lastTripDB['startKM'] = this.endTripData['startKM'];
            lastTripDB['endKM'] = this.endTripData['endKM'];
            this.endTripData['startKM'] = this.endTripData['endKM'];
            this.endTripData['endKM'] = this.carData.lastTrip['endKM'];
            this.dataFBService.fiXLastTripnoDB(lastTripDB['id'], lastTripDB);
            this.closeRegistrationTrip();
          });
      } else {
        const tempEndTrip = {
          // TODO: לסדר שני חלקים של גורם חיוב.
          openRegistration: this.carData.openRegistration,
          whereToRegister: this.endTripData['whereToRegister'],
          dateAndTime: this.endTripData['dateAndTime'],
          carName: this.carData['name'],
          monthBill: `${this.endTripData.dateAndTime.getMonth() +
            1}/${this.endTripData.dateAndTime.getFullYear()}`,
          startKM: Math.round(this.carData.lastTrip['endKM']),
          endKM: Math.round(this.endTripData.startKM),
          carPayBy: this.carData.carPayBy,
          carResponsible: this.carData.responsible,
          carNumber: this.carData.carNumber,
          collectionOfCar: this.carData.collectionOfCar,
          numberOfPas: 1,
          occasional: {
            startDateInFleet: null,
            endDateInFleet: null,
            startKMinFleet: null,
            endKMinFleet: null
          },
          driver: {
            name: 'לא ידוע',
            bill: {
              paidByOrganization: 'לא ידוע',
              nameOfBill: 'לא ידוע'
            },
            circleOfBelonging: 'לא ידוע'
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
        };
        this.dataFBService.setTripToDB(tempEndTrip);
        this.closeRegistrationTrip();
      }
    } else {
      this.closeRegistrationTrip();
    }
  }

  resetEndTripData() {
    this.endKM = null;
    this.endTripData = {
      openRegistration: null,
      whereToRegister: '',
      dateAndTime: null,
      carName: '',
      monthBill: '',
      startKM: null,
      endKM: null,
      carPayBy: '',
      carResponsible: '',
      carNumber: '',
      collectionOfCar: '',
      numberOfPas: 1,
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
    };
  }

  closeRegistrationTrip() {
    this.audioService.playAudio('endTrip');
    this.snackBar.open(`נסיעה נרשמה ב${this.endTripData.carName}`, '', {
      verticalPosition: 'top',
      duration: 3000
    });
    if (this.endTripData['endKM'] - this.endTripData.startKM != 0) {
      this.dataFBService.setTripToDB(this.endTripData);
      this.dataFBService.updataLastTripnoCar(
        this.endTripData.collectionOfCar,
        this.endTripData.carName,
        this.endTripData
      );
    }
    if (this.isContinuedTrip) {
      if (this.endTripData['endKM'] - this.endTripData.startKM != 0) {
        this.dataFBService.updateContinuedCurrentTripNoCar(
          this.endTripData.collectionOfCar,
          this.endTripData.carName,
          this.endTripData
        );
      }
      this.carData.lastTrip['endKM'] = this.endTripData.endKM;
      this.isContinuedTrip = false;
      this.carData.openRegistration = new Date();
      this.carData.currentTrip = {
        driver: {
          name: this.endTripData.driver.name,
          bill: {
            paidByOrganization: this.endTripData.driver.bill.paidByOrganization,
            nameOfBill: this.endTripData.driver.bill.nameOfBill
          },
          circleOfBelonging: this.endTripData.driver.circleOfBelonging
        },
        pas2: {
          name: this.endTripData.pas2.name,
          bill: {
            paidByOrganization: this.endTripData.pas2.bill.paidByOrganization,
            nameOfBill: this.endTripData.pas2.bill.nameOfBill
          },
          circleOfBelonging: this.endTripData.pas2.circleOfBelonging
        },
        pas3: {
          name: this.endTripData.pas3.name,
          bill: {
            paidByOrganization: this.endTripData.pas3.bill.paidByOrganization,
            nameOfBill: this.endTripData.pas3.bill.nameOfBill
          },
          circleOfBelonging: this.endTripData.pas3.circleOfBelonging
        },
        pas4: {
          name: this.endTripData.pas4.name,
          bill: {
            paidByOrganization: this.endTripData.pas4.bill.paidByOrganization,
            nameOfBill: this.endTripData.pas4.bill.nameOfBill
          },
          circleOfBelonging: this.endTripData.pas4.circleOfBelonging
        },
        pas5: {
          name: this.endTripData.pas5.name,
          bill: {
            paidByOrganization: this.endTripData.pas5.bill.paidByOrganization,
            nameOfBill: this.endTripData.pas5.bill.nameOfBill
          },
          circleOfBelonging: this.endTripData.pas5.circleOfBelonging
        },
        pas6: {
          name: this.endTripData.pas6.name,
          bill: {
            paidByOrganization: this.endTripData.pas6.bill.paidByOrganization,
            nameOfBill: this.endTripData.pas6.bill.nameOfBill
          },
          circleOfBelonging: this.endTripData.pas6.circleOfBelonging
        },
        pas7: {
          name: this.endTripData.pas7.name,
          bill: {
            paidByOrganization: this.endTripData.pas7.bill.paidByOrganization,
            nameOfBill: this.endTripData.pas7.bill.nameOfBill
          },
          circleOfBelonging: this.endTripData.pas7.circleOfBelonging
        },
        startKM: this.endTripData.endKM
      };
      this.resetEndTripData();
    } else {
      localStorage.setItem('carName', '');
      localStorage.setItem('collectionOfCar', '');
      this.dataFBService.resetCurrentTripnoCar(
        this.endTripData.collectionOfCar,
        this.endTripData.carName,
        this.endTripData['endKM']
      );
      if (this.isOccCarReturn == true) {
        const dialogPasName = this.dialogMessage.open(DialogMessageComponent, {
          maxWidth: 400,
          data: {
            endTripData: this.endTripData,
            messageName: 'returnOccCar',
            displayName: this.carData.displayName
          },
          autoFocus: false

          // TODO: חזרה אחורה בטלפון תסגור את הדיאלוג
        });

        dialogPasName.afterClosed().subscribe(confirmTrip => {
          if (confirmTrip) {
            const carName = this.carData.name;
            const displayCarName = this.carData.displayName;
            console.log('שמירה של הרכב', this.carData);
            this.isOccCarReturn = false;
            const time = new Date();
            const message = {
              "title": `החזרתי ${carName}`,
              "body": `שם:${this.myName}, זמן החזרת מזדמן: ${time.toLocaleTimeString()}`,
              "icon": './assets/icons/favicon.ico'
            };
            this.fcm.sendMessageToUsher(message);
            this.carDataService.currentCarData.subscribe(val => {
              this.carData = val;
            });
            console.log('שמירה של הרכב', this.carData);
            this.dataFBService.saveOccCarDetails(
              this.carData,
              this.endTripData['endKM']
            );
            this.resetEndTripData();
            this.carDataService.resetCarData();
            console.log('שמירה של הרכב', this.carData);
            this.dataFBService.removeCarFromCarNames(
              displayCarName,
              'משעול-מזדמן'
            );
            this.dataFBService.updataCarData(
              'משעול-מזדמן',
              carName,
              this.carData
            );
            console.log('סוף התהליך', this.carData);
          } else {
            this.snackBar.open('רכב לא חזר להשכרה', '', {
              verticalPosition: 'top',
              duration: 2000
            });
            this.resetEndTripData();
            this.carDataService.resetCarData();
            console.log('סוף התהליך', this.carData);
          }
        });
      } else if (this.isOccCarReturnTH == true) {
        const dialogPasName = this.dialogMessage.open(DialogMessageComponent, {
          maxWidth: 400,
          data: {
            endTripData: this.endTripData,
            messageName: 'returnOccCarTH',
            displayName: this.carData.displayName
          },
          autoFocus: false

          // TODO: חזרה אחורה בטלפון תסגור את הדיאלוג
        });
        dialogPasName.afterClosed().subscribe(confirmTrip => {
          if (confirmTrip) {
            const carName = this.carData.name;
            const displayCarName = this.carData.displayName;
            console.log('שמירה של הרכב', this.carData);
            this.isOccCarReturnTH = false;
            const time = new Date();
            this.carDataService.currentCarData.subscribe(val => {
              this.carData = val;
            });
            console.log('שמירה של הרכב', this.carData);
            this.dataFBService.saveOccCarDetailsTH(
              this.carData,
              this.endTripData['endKM']
            );
            this.resetEndTripData();
            this.carDataService.resetCarData();
            console.log('שמירה של הרכב', this.carData);
            this.dataFBService.removeCarFromCarNames(
              displayCarName,
              'תנועת הנוער-מזדמן'
            );
            this.dataFBService.updataCarData(
              'תנועת הנוער-מזדמן',
              carName,
              this.carData
            );
            console.log('סוף התהליך', this.carData);
          } else {
            this.snackBar.open('רכב לא חזר להשכרה', '', {
              verticalPosition: 'top',
              duration: 2000
            });
            this.resetEndTripData();
            this.carDataService.resetCarData();
            console.log('סוף התהליך', this.carData);
          }
        });
      } else {
        this.resetEndTripData();
        this.carDataService.resetCarData();
        console.log('סוף התהליך', this.carData);
      }
    }
  }
}
