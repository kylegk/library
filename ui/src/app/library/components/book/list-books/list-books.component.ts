import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/library/interfaces/book';
import { BooksService } from 'src/app/library/services/books.service';
import { AuthService } from 'src/app/login/services/auth.service';

@Component({
  selector: 'list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css'],
})
export class ListBooksComponent implements OnInit {
  books: Book[] = [];
  isLoggedIn: boolean;

  constructor(
    private bookService: BooksService,
    private router: Router,
    private authService: AuthService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.getBooks();
  }

  getBooks() {
    this.bookService.getAllBooks().subscribe((books) => {
      this.books = books;
    });
  }

  addBook() {
    this.router.navigate([`/books/book/add`]);
  }

  viewBookDetails(id: string) {
    this.router.navigate([`/books/book/details/${id}`]);
  }
}
