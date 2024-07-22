import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-meds-full-info',
  templateUrl: './meds-full-info.component.html',
  styleUrls: ['./meds-full-info.component.scss']
})
export class MedsFullInfoComponent {

  constructor(private dialogRef: MatDialogRef<MedsFullInfoComponent>){}

  close(){
    this.dialogRef.close()
  }
}
