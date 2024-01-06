import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { BooksService } from 'src/app/library/services/books.service';
import { Book } from 'src/app/library/interfaces/book';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
})
export class EditBookComponent implements OnInit {
  bookId: string;
  book: Book;

  constructor(
    private route: ActivatedRoute,
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
    this.bookId = this.route.snapshot.paramMap.get('id');
    this.bookService.getBookDetails(this.bookId).subscribe((book) => {
      this.book = book;

      this.bookForm.setValue({
        title: this.book.title,
        author: this.book.author,
        description: this.book.description,
        publisher: this.book.publisher,
        isbn: this.book.isbn,
      });
    });
  }

  onSubmit() {
    let bookUpdates = {};
    Object.keys(this.bookForm.controls).map((key) => {
      if (this.bookForm.get(key).dirty) {
        bookUpdates[key] = this.bookForm.get(key).value;
      }
    });

    this.bookService
      .updateBook(this.bookId, bookUpdates as Book)
      .subscribe(() => this.router.navigate(['/books']));
  }

  onCancelClick(e: Event) {
    e.stopPropagation();
    this.router.navigate(['/books']);
  }
}
