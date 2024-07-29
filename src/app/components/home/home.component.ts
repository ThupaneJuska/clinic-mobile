import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  data: any;

  constructor(private router: Router) {
    const data = localStorage.getItem('user');
    this.data = data ? JSON.parse(data) : [];
    console.log("This data", this.data);
  }

  proceed() {
    if (this.data.length === 0) {
      this.router.navigate(['/landing']);
    } else {
      this.router.navigate(['/category']);
    }
  }
}
