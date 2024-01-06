import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private router: Router) {}

  onLoginButtonClick() {
    this.router.navigate(['/login']);
  }

  onHomeButtonClick() {
    this.router.navigate(['/books']);
  }
}
