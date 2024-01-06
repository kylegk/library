import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/login/services/auth.service';
import { Validators } from '@angular/forms';
import { BooksService } from 'src/app/library/services/books.service';
import { Book } from 'src/app/library/interfaces/book';
import { Router } from '@angular/router';

@Component({
  selector: 'add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private bookService: BooksService,
    private router: Router
  ) {}

  bookForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    description: new FormControl('', []),
    publisher: new FormControl('', []),
    isbn: new FormControl('', []),
  });

  ngOnInit(): void {
    const loggedIn = this.authService.isLoggedIn();
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/books']);
    }
  }

  onSubmit() {
    const book: Book = {
      title: this.bookForm.get('title').value ?? '',
      author: this.bookForm.get('author').value ?? '',
      description: this.bookForm.get('description').value ?? '',
      publisher: this.bookForm.get('publisher').value ?? '',
      isbn: this.bookForm.get('isbn').value ?? '',
    };

    this.bookService.addBook(book).subscribe(() => {
      this.bookForm.reset();
      this.router.navigate(['/books']);
    });
  }

  onCancelClick(e: Event) {
    e.stopPropagation();
    this.router.navigate(['/books']);
  }
}
