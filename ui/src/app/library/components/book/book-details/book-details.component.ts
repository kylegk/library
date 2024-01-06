import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/library/interfaces/book';
import { BooksService } from 'src/app/library/services/books.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/login/services/auth.service';

@Component({
  selector: 'book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  book: Book;
  isLoggedIn: boolean;

  constructor(
    private route: ActivatedRoute,
    private bookService: BooksService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getBookDetails();
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  getBookDetails() {
    const id = this.route.snapshot.paramMap.get('id');
    this.bookService.getBookDetails(id).subscribe((book) => {
      this.book = book;
    });
  }
}
