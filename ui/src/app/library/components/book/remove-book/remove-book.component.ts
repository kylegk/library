import { Component } from '@angular/core';
import { AuthService } from 'src/app/login/services/auth.service';

@Component({
  selector: 'remove-book',
  templateUrl: './remove-book.component.html',
  styleUrls: ['./remove-book.component.css'],
})
export class RemoveBookComponent {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const loggedIn = this.authService.isLoggedIn();

    // TODO: Check if the user is logged in and kick them out if not
  }
}
