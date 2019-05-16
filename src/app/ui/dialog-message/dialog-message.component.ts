import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { carModule } from 'src/app/models/car-module';

@Component({
  selector: 'app-dialog-message',
  templateUrl: './dialog-message.component.html',
  styleUrls: ['./dialog-message.component.scss']
})
export class DialogMessageComponent implements OnInit {
  endTripData = this.data.endTripData;
  messageName = this.data.messageName;
  tripKM = this.data.tripKM;
  constructor(
    public dialogRef: MatDialogRef<DialogMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  cancel() {
    this.dialogRef.close(false);
  }
  registrationTrip() {
    this.dialogRef.close(true);
  }
}
