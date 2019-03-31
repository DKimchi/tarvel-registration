import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-biil-pickr',
  templateUrl: './biil-pickr.component.html',
  styleUrls: ['./biil-pickr.component.scss']
})
export class BiilPickrComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = this.data.pasBillNames;
  filteredOptions: Observable<string[]>;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<BiilPickrComponent>
  ) {}

  choosePas(event: any): void {
    this.dialogRef.close(event);
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option =>
      option.toLowerCase().startsWith(filterValue)
    );
  }
}
