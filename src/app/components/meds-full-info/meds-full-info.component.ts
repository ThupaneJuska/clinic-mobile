import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-meds-full-info',
  templateUrl: './meds-full-info.component.html',
  styleUrls: ['./meds-full-info.component.scss']
})
export class MedsFullInfoComponent {

  availability: any;
  medName:any;
  description:any;
  medFor:any;
  imageUrl: any;

  constructor(private dialogRef: MatDialogRef<MedsFullInfoComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private router: Router){
    console.log("Data from another component", this.data.medData)
    this.availability = this.data.medData.availability;
    this.medName = this.data.medData.name;
    this.description = this.data.medData.description
    this.medFor = this.data.medData.medFor
    this.imageUrl =  `http://localhost:3000/download-file/${this.data.medData.fileId}`
  }

  close(){
    this.dialogRef.close()
  }

 
}
