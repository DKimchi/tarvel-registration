import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { AuthService } from 'src/app/services/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-delete-const-trip',
  templateUrl: './delete-const-trip.component.html',
  styleUrls: ['./delete-const-trip.component.scss']
})
export class DeleteConstTripComponent implements OnInit {
  constTripName = this.data.name;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteConstTripComponent>,
    private auth: AuthService
  ) {}

  ngOnInit() {}

  cancel() {
    this.dialogRef.close();
  }

  delete() {
    this.auth.user$.pipe(take(1)).subscribe(val => {
      for (let index = 0; index < val.constTrips.length; index++) {
        if (val.constTrips[index]['name'] === this.constTripName) {
          val.constTrips.splice(index, 1);
          console.log(val);
          this.auth.updateUserData(val);
          this.dialogRef.close();
        }
      }
    });
  }
}
