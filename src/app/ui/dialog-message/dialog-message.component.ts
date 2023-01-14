import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { carModule } from 'src/app/models/car-module';
import { CarDataService } from 'src/app/services/car-data.service';

@Component({
  selector: 'app-dialog-message',
  templateUrl: './dialog-message.component.html',
  styleUrls: ['./dialog-message.component.scss']
})
export class DialogMessageComponent implements OnInit {
  endTripData = this.data.endTripData;
  messageName = this.data.messageName;
  tripKM = this.data.tripKM;
  carData: carModule;
  carName = this.data.carName;
  constructor(
    public dialogRef: MatDialogRef<DialogMessageComponent>,
    public carDataService: CarDataService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.carDataService.currentCarData.subscribe(val => (this.carData = val));
  }

  ngOnInit() {}

  cancel() {
    this.dialogRef.close(false);
  }
  registrationTrip() {
    this.dialogRef.close(true);
  }
}
