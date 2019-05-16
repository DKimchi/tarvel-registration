import { Component, OnInit } from '@angular/core';

import { CarDataService } from 'src/app/services/car-data.service';
import { DataFBService } from 'src/app/services/data-fb.service';
import { tripModule } from 'src/app/models/trip-module';
import { carModule } from 'src/app/models/car-module';
import { copyStyles } from '@angular/animations/browser/src/util';
import { take } from 'rxjs/operators';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DialogMessageComponent } from '../dialog-message/dialog-message.component';

@Component({
  selector: 'app-end-trip',
  templateUrl: './end-trip.component.html',
  styleUrls: ['./end-trip.component.scss']
})
export class EndTripComponent implements OnInit {
  isOccCarReturn = false;
  soundNo = true;
  collectionOfCar: string;
  endKM: number = null;
  // : Observable<any>;
  carData: carModule;

  endTripData: tripModule = {
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
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.carDataService.currentCarData.subscribe(val => {
      this.carData = val;
      this.collectionOfCar = val.collectionOfCar;
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

  setPaidByOrganization() {
    for (let index = 1; index <= 7; index++) {
      let pas = '';
      if (index === 1) {
        pas = 'driver';
      } else {
        pas = 'pas' + index;
      }
      const selectedPaidByOrganization = this.carData['currentTrip'][pas][
        'bill'
      ]['nameOfBill'].split(' - ');
      this.carData['currentTrip'][pas]['bill']['paidByOrganization'] =
        selectedPaidByOrganization[0];
      console.log(
        'משולם ע"י',
        this.carData['currentTrip'][pas]['bill']['paidByOrganization']
      );
    }
  }

  test() {
    console.log(this.carData.name);
  }
  // TODO: למחוק פינקציה test

  async endTrip() {
    await this.setCircleOfBelonging();
    await this.setPaidByOrganization();
    this.endTripData.dateAndTime = new Date();
    this.endTripData = {
      dateAndTime: new Date(),
      carName: this.carData['name'],
      monthBill: `${this.endTripData.dateAndTime.getMonth() +
        1}/${this.endTripData.dateAndTime.getFullYear()}`,
      startKM: this.carData['currentTrip']['startKM'],
      endKM: this.endKM,
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
    if (this.endTripData.carName === '') {
      this.snackBar.open('לא נבחר רכב', '', {
        verticalPosition: 'top',
        duration: 2000
      });
      console.log('לא נבחר רכב');
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (this.endTripData.startKM == null) {
      this.snackBar.open('חסר ק"מ פתיחה', '', {
        verticalPosition: 'top',
        duration: 2000
      });
      console.log('חסר ק"מ פתיחה');

      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (this.endTripData.endKM == null) {
      this.snackBar.open('חסר ק"מ סיום', '', {
        verticalPosition: 'top',
        duration: 2000
      });
      console.log('חסר ק"מ סיום');
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (this.endTripData.driver['name'] === '') {
      this.snackBar.open('לא נבחר שם נהג', '', {
        verticalPosition: 'top',
        duration: 2000
      });
      console.log('לא נחבר שם נהג');
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (this.endTripData.driver['bill']['nameOfBill'] === '') {
      this.snackBar.open('לא נבחר חשבון נהג', '', {
        verticalPosition: 'top',
        duration: 2000
      });
      console.log('לא נבחר חשבון נהג');
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (this.endTripData.startKM > this.endTripData.endKM) {
      this.snackBar.open('ק"מ פתיחה לא יכול להיות יותר מק"מ סיום', '', {
        verticalPosition: 'top',
        duration: 2000
      });
      console.log('ק"מ פתיחה לא יכול להיות יותר מק"מ סיום');
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (
      this.endTripData.pas2['name'] === '' &&
      this.endTripData.pas2['bill']['nameOfBill'] !== ''
    ) {
      this.snackBar.open('חסר שם לנוסע 2', '', {
        verticalPosition: 'top',
        duration: 2000
      });
      console.log('חסר שם לנוסע 2');
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (
      this.endTripData.pas2['bill']['nameOfBill'] === '' &&
      this.endTripData.pas2['name'] !== ''
    ) {
      this.snackBar.open('חסר יעד חיוב לנוסע 2', '', {
        verticalPosition: 'top',
        duration: 2000
      });
      console.log('חסר יעד חיוב לנוסע 2');
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (
      this.endTripData.pas3['name'] === '' &&
      this.endTripData.pas3['bill']['nameOfBill'] !== ''
    ) {
      this.snackBar.open('חסר שם לנוסע 3', '', {
        verticalPosition: 'top',
        duration: 2000
      });
      console.log('חסר שם לנוסע 3');
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (
      this.endTripData.pas3['bill']['nameOfBill'] === '' &&
      this.endTripData.pas3['name'] !== ''
    ) {
      this.snackBar.open('חסר יעד חיוב לנוסע 3', '', {
        verticalPosition: 'top',
        duration: 2000
      });
      console.log('חסר יעד חיוב לנוסע 3');
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (
      this.endTripData.pas4['name'] === '' &&
      this.endTripData.pas4['bill']['nameOfBill'] !== ''
    ) {
      this.snackBar.open('חסר שם לנוסע 4', '', {
        verticalPosition: 'top',
        duration: 2000
      });
      console.log('חסר שם לנוסע 4');

      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (
      this.endTripData.pas4['bill']['nameOfBill'] === '' &&
      this.endTripData.pas4['name'] !== ''
    ) {
      this.snackBar.open('חסר יעד חיוב לנוסע 4', '', {
        verticalPosition: 'top',
        duration: 2000
      });
      console.log('חסר יעד חיוב לנוסע 4');
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (
      this.endTripData.pas5['name'] === '' &&
      this.endTripData.pas5['bill']['nameOfBill'] !== ''
    ) {
      this.snackBar.open('חסר שם לנוסע 5', '', {
        verticalPosition: 'top',
        duration: 2000
      });
      console.log('חסר שם לנוסע 5');
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (
      this.endTripData.pas5['bill']['nameOfBill'] === '' &&
      this.endTripData.pas5['name'] !== ''
    ) {
      this.snackBar.open('חסר יעד חיוב לנוסע 5', '', {
        verticalPosition: 'top',
        duration: 2000
      });
      console.log('חסר יעד חיוב לנוסע 5');
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (
      this.endTripData.pas6['name'] === '' &&
      this.endTripData.pas6['bill']['nameOfBill'] !== ''
    ) {
      this.snackBar.open('חסר שם לנוסע 6', '', {
        verticalPosition: 'top',
        duration: 2000
      });
      console.log('חסר שם לנוסע 6');
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (
      this.endTripData.pas6['bill']['nameOfBill'] === '' &&
      this.endTripData.pas6['name'] !== ''
    ) {
      this.snackBar.open('חסר יעד חיוב לנוסע 6', '', {
        verticalPosition: 'top',
        duration: 2000
      });
      console.log('חסר יעד חיוב לנוסע 6');
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (
      this.endTripData.pas7['name'] === '' &&
      this.endTripData.pas7['bill']['nameOfBill'] !== ''
    ) {
      this.snackBar.open('חסר שם לנוסע 7', '', {
        verticalPosition: 'top',
        duration: 2000
      });
      console.log('חסר שם לנוסע 7');
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (
      this.endTripData.pas7['bill']['nameOfBill'] === '' &&
      this.endTripData.pas7['name'] !== ''
    ) {
      this.snackBar.open('חסר יעד חיוב לנוסע 7', '', {
        verticalPosition: 'top',
        duration: 2000
      });
      console.log('חסר יעד חיוב לנוסע 7');
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
      if (tripKM < 500) {
        messageName = 'confirmedTrip';
      } else {
        messageName = 'confirmedLongTrip';
      }
      const dialogPasName = this.dialogMessage.open(DialogMessageComponent, {
        maxWidth: 400,
        data: {
          endTripData: this.endTripData,
          messageName: messageName,
          tripKM: tripKM
        },
        autoFocus: false

        // TODO: חזרה אחורה בטלפון תסגור את הדיאלוג
      });

      dialogPasName.afterClosed().subscribe(confirmTrip => {
        if (confirmTrip) {
          this.registrationToDB();
        } else {
          this.snackBar.open('רישום נסיעה בוטל', '', {
            verticalPosition: 'top',
            duration: 2000
          });
        }
      });
    }
  }

  soundNoButClick() {
    this.soundNo = !this.soundNo;
    // TODO: לשים קולות לסגרית פפתיח של נסיעה
  }

  registrationToDB() {
    console.log(this.endTripData);
    if (
      this.carData.lastTrip['endKM'] &&
      this.endTripData.startKM !== this.carData.lastTrip['endKM']
    ) {
      const differenceBetweenTrips =
        this.endTripData.startKM - this.carData.lastTrip['endKM'];
      console.log(differenceBetweenTrips);
      console.log(this.endTripData);
      if (differenceBetweenTrips <= 30 && differenceBetweenTrips > 0) {
        let lastTripDB;
        this.dataFBService
          .getLastTrip(this.carData.lastTrip['dateAndTime'])
          .subscribe(data => {
            lastTripDB = data[0];
            console.log(this.endTripData);
            console.log(lastTripDB);
            lastTripDB['endKM'] += Math.ceil(differenceBetweenTrips / 2);
            this.endTripData['startKM'] -= Math.floor(
              differenceBetweenTrips / 2
            );
            console.log(lastTripDB['endKM'], this.endTripData['startKM']);
            this.dataFBService.fiXLastTripnoDB(lastTripDB['id'], lastTripDB);
            this.closeRegistrationTrip();
          });
      } else {
        const tempEndTrip = {
          // TODO: לסדר שני חלקים של גורם חיוב.
          dateAndTime: this.endTripData['dateAndTime'],
          carName: this.carData['name'],
          monthBill: `${this.endTripData.dateAndTime.getMonth() +
            1}/${this.endTripData.dateAndTime.getFullYear()}`,
          startKM: this.carData.lastTrip['endKM'],
          endKM: this.endTripData.startKM,
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
    this.dataFBService.setTripToDB(this.endTripData);
    this.dataFBService.updataLastTripnoCar(
      this.endTripData.collectionOfCar,
      this.endTripData.carName,
      this.endTripData
    );
    this.dataFBService.resetCurrentTripnoCar(
      this.endTripData.collectionOfCar,
      this.endTripData.carName,
      this.endTripData['endKM']
    );
    if (this.isOccCarReturn == true) {
      const carName = this.carData.name;
      const displayCarName = this.carData.displayName;
      console.log('שמירה של הרכב', this.carData);
      this.isOccCarReturn = false;
      this.carDataService.currentCarData.subscribe(val => {
        this.carData = val;
      });
      console.log('שמירה של הרכב', this.carData);
      this.dataFBService.saveOccCarDetails(this.carData);
      this.resetEndTripData();
      this.carDataService.resetCarData();
      console.log('שמירה של הרכב', this.carData);
      this.dataFBService.removeCarFromCarNames(displayCarName, 'משעול-מזדמן');
      this.dataFBService.updataCarData('משעול-מזדמן', carName, this.carData);
      console.log('סוף התהליך', this.carData);
    } else {
      this.resetEndTripData();
      this.carDataService.resetCarData();
      console.log('סוף התהליך', this.carData);
      // }
    }
  }
}
