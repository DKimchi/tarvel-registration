import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DataFBService } from 'src/app/services/data-fb.service';
import { PasPickrComponent } from '../pas-pickr/pas-pickr.component';
import { BiilPickrComponent } from '../biil-pickr/biil-pickr.component';
import { take, switchMap, map, elementAt } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-new-const-trip',
  templateUrl: './new-const-trip.component.html',
  styleUrls: ['./new-const-trip.component.scss']
})
export class NewConstTripComponent implements OnInit {
  // tslint:disable-next-line:ban-types
  indexConstTrip = -1;
  billNames: {
    driver: [];
    pas2: [];
    pas3: [];
    pas4: [];
    pas5: [];
    pas6: [];
    pas7: [];
    general: [];
  } = {
    driver: null,
    pas2: null,
    pas3: null,
    pas4: null,
    pas5: null,
    pas6: null,
    pas7: null,
    general: null
  };
  pasNames: string[];
  constTrip = {
    name: '',
    driver: {
      name: '',
      bill: ''
    },
    pas2: {
      name: '',
      bill: ''
    },
    pas3: {
      name: '',
      bill: ''
    },
    pas4: {
      name: '',
      bill: ''
    },
    pas5: {
      name: '',
      bill: ''
    },
    pas6: {
      name: '',
      bill: ''
    },
    pas7: {
      name: '',
      bill: ''
    }
  };
  constructor(
    private dialogPasPickr: MatDialog,
    public auth: AuthService,
    private snackBar: MatSnackBar,
    public dataFBService: DataFBService,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private afs: AngularFirestore
  ) {
    // const url = this.router.url.slice(16);
    // this.nameConstTripURL = decodeURIComponent(url);
  }

  ngOnInit() {
    this.dataFBService.getGeneralDataFormFB().subscribe(val => {
      this.pasNames = val['pasNames'].split(',');
      this.billNames['general'] = val['billNames'].split(',');
      this.pasNames.unshift('אפס שם');
      this.billNames.driver = val['billNames'].split(',');
    });
    const url = this.router.url.slice(16);
    const name = decodeURIComponent(url);
    if (name) {
      this.auth.user$.pipe(take(1)).subscribe(val => {
        this.indexConstTrip = val.constTrips.findIndex(
          element => element['name'] === name
        );
        val.constTrips
          .filter(element => element['name'] === name)
          .map(saveConstTrip => {
            this.constTrip.name = saveConstTrip['name'];
            this.constTrip.driver.name = saveConstTrip['driver']['name'];
            this.constTrip.driver.bill = saveConstTrip['driver']['bill'];
            this.constTrip.pas2.name = saveConstTrip['pas2']['name'];
            this.constTrip.pas2.bill = saveConstTrip['pas2']['bill'];
            this.constTrip.pas3.name = saveConstTrip['pas3']['name'];
            this.constTrip.pas3.bill = saveConstTrip['pas3']['bill'];
            this.constTrip.pas4.name = saveConstTrip['pas4']['name'];
            this.constTrip.pas4.bill = saveConstTrip['pas4']['bill'];
            this.constTrip.pas5.name = saveConstTrip['pas5']['name'];
            this.constTrip.pas5.bill = saveConstTrip['pas5']['bill'];
            this.constTrip.pas6.name = saveConstTrip['pas6']['name'];
            this.constTrip.pas6.bill = saveConstTrip['pas6']['bill'];
            this.constTrip.pas7.name = saveConstTrip['pas7']['name'];
            this.constTrip.pas7.bill = saveConstTrip['pas7']['bill'];
          });
      });
    }
  }

  // TODO: להוריד את האפס שם ולצור דרך אחרת לאפס את השם ויעד חיוב
  test() {}
  // TODO: למחוק פונציה test()

  openDialogPasNames(psaSelected: string) {
    const dialogPasName = this.dialogPasPickr.open(PasPickrComponent, {
      maxWidth: 400,
      panelClass: 'custom-dialog',
      data: this.pasNames,
      autoFocus: true

      // TODO: חזרה אחורה בטלפון תסגור את הדיאלוג
    });

    dialogPasName.afterClosed().subscribe(selected => {
      if (selected) {
        if (selected === 'אפס שם') {
          this.constTrip[psaSelected]['name'] = '';
        } else {
          this.constTrip[psaSelected]['name'] = selected;
          this.dataFBService.getUserData(selected).subscribe(userData => {
            if (userData.length !== 0) {
              this.billNames[psaSelected] = userData[0]['mainBills'];
            } else {
              this.billNames[psaSelected] = this.billNames['general'];
            }
          });
        }
        // TODO: לסדר איפוס של המשתנה
      } else {
        console.log(selected);
        // TODO: לסדר חוסר בחירה
      }
    });
  }

  openDialogPasBill(billSelected: string) {
    const dialogPasBill = this.dialogPasPickr.open(BiilPickrComponent, {
      maxWidth: 400,
      panelClass: 'custom-dialog',
      data: {
        pasBillNames: this.billNames[billSelected],
        generalBillNames: this.billNames['general']
      },
      autoFocus: true
      // TODO: קריאה של היעדי חיוב עיקריים
    });
    dialogPasBill.afterClosed().subscribe(selected => {
      if (selected) {
        if (selected === 'אפס יעד חיוב') {
          this.constTrip[billSelected]['bill'] = '';
        } else {
          this.constTrip[billSelected]['bill'] = selected;
        }
      } else {
        console.log(selected);
        // TODO: מה עושים שלא בוחרים במשהו
      }
    });
  }

  saveConstTrip() {
    if (!this.constTrip.name) {
      this.snackBar.open('חסר שם נסיעה קבועה', '', {
        verticalPosition: 'top',
        duration: 3000
      });
    } else {
      this.auth.user$.pipe(take(1)).subscribe(val => {
        if (this.indexConstTrip !== -1) {
          val.constTrips[this.indexConstTrip] = this.constTrip;
          console.log('שינוי נסיעה קיימת', val.constTrips[this.indexConstTrip]);
        } else {
          val.constTrips.push(this.constTrip);
          console.log('נסיעה חדשה');
        }
        console.log(val);
        this.auth.updateUserData(val);
        this.router.navigate(['/main-from']);
      });
    }
  }
}
