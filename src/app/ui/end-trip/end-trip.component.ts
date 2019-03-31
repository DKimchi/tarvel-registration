import { Component, OnInit } from '@angular/core';

import { CarDataService } from 'src/app/services/car-data.service';
import { DataFBService } from 'src/app/services/data-fb.service';
import { tripModule } from 'src/app/models/trip-module';
import { carModule } from 'src/app/models/car-module';

@Component({
  selector: 'app-end-trip',
  templateUrl: './end-trip.component.html',
  styleUrls: ['./end-trip.component.scss']
})
export class EndTripComponent implements OnInit {
  soundNo = true;
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
    occasional: {
      startDateInFleet: null,
      endDateInFleet: null,
      startKMinFleet: null,
      endKMinFleet: null
    },
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
    public carDataService: CarDataService,
    public dataFBService: DataFBService
  ) {}

  ngOnInit() {
    this.carDataService.currentCarData.subscribe(val => {
      this.carData = val;
    });
  }

  changeEndKM(e) {
    this.endKM = Number(e.target.value);
  }

  endTrip() {
    this.endTripData.dateAndTime = new Date();
    this.endTripData = {
      dateAndTime: new Date(),
      carName: this.carData['name'],
      monthBill: `${this.endTripData.dateAndTime.getMonth() +
        1}/${this.endTripData.dateAndTime.getFullYear()}`,
      startKM: this.carData['currentTrip']['startKM'],
      endKM: this.endKM,
      carPayBy: this.carData.payment,
      carResponsible: this.carData.responsible,
      carNumber: this.carData.carNumber,
      collectionOfCar: this.carData.collectionOfCar,
      numberOfPas: 1,
      occasional: {
        startDateInFleet: new Date(),
        endDateInFleet: new Date(),
        startKMinFleet: null,
        endKMinFleet: null
      },
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
        circleOfBelonging: ''
      },
      pas2: {
        name: this.carData['currentTrip']['pas2']['name'],
        bill: {
          paidByOrganization: this.carData['currentTrip']['pas2']['bill'][
            'paidByOrganization'
          ],
          nameOfBill: this.carData['currentTrip']['pas2']['bill']['nameOfBill']
        },
        circleOfBelonging: ''
      },
      pas3: {
        name: this.carData['currentTrip']['pas3']['name'],
        bill: {
          paidByOrganization: this.carData['currentTrip']['pas3']['bill'][
            'paidByOrganization'
          ],
          nameOfBill: this.carData['currentTrip']['pas3']['bill']['nameOfBill']
        },
        circleOfBelonging: ''
      },
      pas4: {
        name: this.carData['currentTrip']['pas4']['name'],
        bill: {
          paidByOrganization: this.carData['currentTrip']['pas4']['bill'][
            'paidByOrganization'
          ],
          nameOfBill: this.carData['currentTrip']['pas4']['bill']['nameOfBill']
        },
        circleOfBelonging: ''
      },
      pas5: {
        name: this.carData['currentTrip']['pas5']['name'],
        bill: {
          paidByOrganization: this.carData['currentTrip']['pas5']['bill'][
            'paidByOrganization'
          ],
          nameOfBill: this.carData['currentTrip']['pas5']['bill']['nameOfBill']
        },
        circleOfBelonging: ''
      },
      pas6: {
        name: this.carData['currentTrip']['pas6']['name'],
        bill: {
          paidByOrganization: this.carData['currentTrip']['pas6']['bill'][
            'paidByOrganization'
          ],
          nameOfBill: this.carData['currentTrip']['pas6']['bill']['nameOfBill']
        },
        circleOfBelonging: ''
      },
      pas7: {
        name: this.carData['currentTrip']['pas7']['name'],
        bill: {
          paidByOrganization: this.carData['currentTrip']['pas7']['bill'][
            'paidByOrganization'
          ],
          nameOfBill: this.carData['currentTrip']['pas7']['bill']['nameOfBill']
        },
        circleOfBelonging: ''
      }
    };
    if (this.endTripData.carName === '') {
      console.log('לא נבחר רכב');
      alert('לא נבחר רכב');
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (this.endTripData.startKM == null) {
      console.log('חסר ק"מ פתיחה');
      alert('חסר ק"מ פתיחה');
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (this.endTripData.endKM == null) {
      console.log('חסר ק"מ סיום');
      alert('חסר ק"מ סיום');
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (this.endTripData.driver['name'] === '') {
      console.log('לא נחבר שם נהג');
      alert('לא נבחר שם נהג');
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (this.endTripData.driver['bill']['nameOfBill'] === '') {
      console.log('לא נבחר חשבון נהג');
      alert('לא נבחר חשבון נהג');
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (this.endTripData.startKM > this.endTripData.endKM) {
      console.log('ק"מ פתיחה לא יכול להיות יותר מק"מ סיום');
      alert('ק"מ פתיחה לא יכול להיות יותר מק"מ סיום');
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (
      this.endTripData.pas2['name'] === '' &&
      this.endTripData.pas2['bill']['nameOfBill'] !== ''
    ) {
      console.log('חסר שם לנוסע 2');
      alert('חסר שם לנוסע 2');
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (
      this.endTripData.pas2['bill']['nameOfBill'] === '' &&
      this.endTripData.pas2['name'] !== ''
    ) {
      console.log('חסר יעד חיוב לנוסע 2');
      alert('חסר יעד חיוב לנוסע 2');
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (
      this.endTripData.pas3['name'] === '' &&
      this.endTripData.pas3['bill']['nameOfBill'] !== ''
    ) {
      console.log('חסר שם לנוסע 3');
      alert('חסר שם לנוסע 3');
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (
      this.endTripData.pas3['bill']['nameOfBill'] === '' &&
      this.endTripData.pas3['name'] !== ''
    ) {
      console.log('חסר יעד חיוב לנוסע 3');
      alert('חסר יעד חיוב לנוסע 3');
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (
      this.endTripData.pas4['name'] === '' &&
      this.endTripData.pas4['bill']['nameOfBill'] !== ''
    ) {
      console.log('חסר שם לנוסע 4');
      alert('חסר שם לנוסע 4');
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (
      this.endTripData.pas4['bill']['nameOfBill'] === '' &&
      this.endTripData.pas4['name'] !== ''
    ) {
      console.log('חסר יעד חיוב לנוסע 4');
      alert('חסר יעד חיוב לנוסע 4');
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (
      this.endTripData.pas5['name'] === '' &&
      this.endTripData.pas5['bill']['nameOfBill'] !== ''
    ) {
      console.log('חסר שם לנוסע 5');
      alert('חסר שם לנוסע 5');
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (
      this.endTripData.pas5['bill']['nameOfBill'] === '' &&
      this.endTripData.pas5['name'] !== ''
    ) {
      console.log('חסר יעד חיוב לנוסע 5');
      alert('חסר יעד חיוב לנוסע 5');
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (
      this.endTripData.pas6['name'] === '' &&
      this.endTripData.pas6['bill']['nameOfBill'] !== ''
    ) {
      console.log('חסר שם לנוסע 6');
      alert('חסר שם לנוסע 6');
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (
      this.endTripData.pas6['bill']['nameOfBill'] === '' &&
      this.endTripData.pas6['name'] !== ''
    ) {
      console.log('חסר יעד חיוב לנוסע 6');
      alert('חסר יעד חיוב לנוסע 6');
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (
      this.endTripData.pas7['name'] === '' &&
      this.endTripData.pas7['bill']['nameOfBill'] !== ''
    ) {
      console.log('חסר שם לנוסע 7');
      alert('חסר שם לנוסע 7');
      // TODO: לדסר הודעה על אי בחירת רכב.
    } else if (
      this.endTripData.pas7['bill']['nameOfBill'] === '' &&
      this.endTripData.pas7['name'] !== ''
    ) {
      console.log('חסר יעד חיוב לנוסע 7');
      alert('חסר יעד חיוב לנוסע 7');
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

      this.registrationToDB();
    }
  }

  test() {
    this.dataFBService.updataLastTripnoCar(
      this.carData.collectionOfCar,
      this.carData.name,
      this.endTripData
    );
    this.dataFBService.setTripToDB(this.endTripData);
  }

  soundNoButClick() {
    this.soundNo = !this.soundNo;
    // TODO: לשים קולות לסגרית פפתיח של נסיעה
  }

  registrationToDB() {
    if (
      this.carData.lastTrip['endKM'] &&
      this.endTripData.startKM !== this.carData.lastTrip['endKM']
    ) {
      const differenceBetweenTrips =
        this.endTripData.startKM - this.carData.lastTrip['endKM'];
      console.log(differenceBetweenTrips);
      if (differenceBetweenTrips <= 30 && differenceBetweenTrips > 0) {
        let lastTripDB;
        this.dataFBService
          .getLastTrip(this.carData.lastTrip['dateAndTime'])
          .subscribe(data => {
            lastTripDB = data[0];

            lastTripDB['endKM'] += Math.ceil(differenceBetweenTrips / 2);
            this.endTripData['startKM'] -= Math.floor(
              differenceBetweenTrips / 2
            );
            console.log(lastTripDB['endKM'], this.endTripData['startKM']);
            this.dataFBService.fiXLastTripnoDB(lastTripDB['id'], lastTripDB);
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
            this.resetEndTripData();
            this.carDataService.resetCarData();

            console.log('סוף התהליך', this.carData);
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
          carPayBy: this.carData.payment,
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
        this.dataFBService.setTripToDB(this.endTripData);
        this.dataFBService.updataLastTripnoCar(
          this.carData.collectionOfCar,
          this.carData.name,
          this.endTripData
        );
        this.dataFBService.resetCurrentTripnoCar(
          this.carData.collectionOfCar,
          this.carData.name,
          this.endTripData['endKM']
        );

        this.resetEndTripData();
        this.carDataService.resetCarData();
        console.log('tempEndTrip', tempEndTrip);
      }
    } else {
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
      this.resetEndTripData();
      this.carDataService.resetCarData();
    }
    console.log('סוף התהליך', this.carData);
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
      occasional: {
        startDateInFleet: null,
        endDateInFleet: null,
        startKMinFleet: null,
        endKMinFleet: null
      },
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
}
