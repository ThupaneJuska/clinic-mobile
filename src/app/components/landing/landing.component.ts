import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  isKeyboardOpen = false;
  previousHeight = window.innerHeight;

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

  registerForm: FormGroup;

  constructor(private snackbar: MatSnackBar, private router: Router) {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      cellNumber: new FormControl('', [Validators.required])
    });
  }

  submit(){
    if(this.registerForm.invalid){
      this.snackbar.open("All fields must be filled","Ok",{duration:3000})
      return;
    }

    else{
      this.router.navigate(['/category'])
    }

  }
}
