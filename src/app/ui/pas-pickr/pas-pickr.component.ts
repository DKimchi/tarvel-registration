import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-pas-pickr',
  templateUrl: './pas-pickr.component.html',
  styleUrls: ['./pas-pickr.component.scss']
})
export class PasPickrComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = this.data;
  filteredOptions: Observable<string[]>;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PasPickrComponent>
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
