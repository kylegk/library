import { Component } from '@angular/core';
import { AuthService } from 'src/app/login/services/auth.service';

@Component({
  selector: 'update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css'],
})
export class UpdateBookComponent {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const loggedIn = this.authService.isLoggedIn();

    // TODO: Check if the user is logged in and kick them out if not
  }
}
