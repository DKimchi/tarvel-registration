import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-pas-pickr',
  templateUrl: './pas-pickr.component.html',
  styleUrls: ['./pas-pickr.component.scss']
})
export class PasPickrComponent implements OnInit {
  myControl = new FormControl();
  psaSelected = this.data.psaSelected;
  displayName: string;
  pasName = this.data.pasName;
  options: string[] = this.data.pasNames;
  filteredOptions: Observable<string[]>;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PasPickrComponent>,
    public auth: AuthService
  ) {}

  choosePas(event: any): void {
    this.dialogRef.close(event);
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    switch (this.psaSelected) {
      case 'driver':
        this.displayName = 'נהג';
        break;
      case 'pas2':
        this.displayName = 'נוסע 2';
        break;
      case 'pas3':
        this.displayName = 'נוסע 3';
        break;
      case 'pas4':
        this.displayName = 'נוסע 4';
        break;
      case 'pas5':
        this.displayName = 'נוסע 5';
        break;
      case 'pas6':
        this.displayName = 'נוסע 6';
        break;
      case 'pas7':
        this.displayName = 'נוסע 7';
        break;
      default:
        this.displayName = 'נוסע לא ידוע';
        break;
    }
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option =>
      option.toLowerCase().startsWith(filterValue)
    );
  }

  openConstTrip() {
    this.dialogRef.close('constTrip');
  }

  closedPasPickr() {
    this.dialogRef.close();
  }
}
