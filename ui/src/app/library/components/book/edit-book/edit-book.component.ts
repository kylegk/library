import { Component } from '@angular/core';
import { AuthService } from 'src/app/login/services/auth.service';

@Component({
  selector: 'edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
})
export class EditBookComponent {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const loggedIn = this.authService.isLoggedIn();

    // TODO: Check if the user is logged in and kick them out if not
  }
}
