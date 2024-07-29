import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { MedsFullInfoComponent } from '../meds-full-info/meds-full-info.component';
import { Router } from '@angular/router';

interface Medication {
  name: string;
  description: string;
  availability: string;
  fileId: string;
  medFor: string;
}

@Component({
  selector: 'app-medication',
  templateUrl: './medication.component.html',
  styleUrls: ['./medication.component.scss']
})
export class MedicationComponent {
  isKeyboardOpen = false;
  previousHeight = window.innerHeight;

  searchTerm = '';
  medications: Medication[] = [];
  filteredMeds: Medication[] = [];

  constructor(private auth: ApiServiceService, private dialog: MatDialog, private router: Router) {
    this.fetchMedications();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const viewportHeight = window.innerHeight;
    this.isKeyboardOpen = viewportHeight < this.previousHeight;
    this.previousHeight = viewportHeight;
  }

  @HostListener('focusin', ['$event'])
  onFocus(event: FocusEvent) {
    if (event.target instanceof HTMLElement) {
      setTimeout(() => {
        const element = event.target as HTMLElement;
        const yOffset = -50;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }, 300);
    }
  }

  filterMeds() {
    this.filteredMeds = this.medications.filter(med => 
      med.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      med.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  fetchMedications() {
    this.auth.get('/get-meds').subscribe(
      (res: Medication[]) => {
        this.medications = res.map((med: Medication) => ({
          name: med.name,
          description: med.description,
          availability: med.availability,
          fileId: med.fileId,
          medFor: med.medFor
        }));
        this.filteredMeds = this.medications;
      },
      err => {
        console.log('Error fetching medications', err);
      }
    );
  }

  medi(i:any){
    console.log("Cliked",i)
    const dialogData = {
      medData: i 
    };
    this.dialog.open(MedsFullInfoComponent,{
      height:'70%',
      width:'90%',
      data: dialogData
    })
  }

  back(){
    this.router.navigate(['/category'])
  }
}
