import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/login/services/auth.service';

@Component({
  selector: 'add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const loggedIn = this.authService.isLoggedIn();
    // TODO: Check if the user is logged in and kick them out if not
    if (!this.authService.isLoggedIn()) {
      console.log('here');
    }
  }
}
