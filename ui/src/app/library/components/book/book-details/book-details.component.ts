import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/library/interfaces/book';
import { BooksService } from 'src/app/library/services/books.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/login/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { RemoveBookDialogComponent } from '../remove-book-dialog/remove-book-dialog.component';

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
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog
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

  openRemoveDialogClick(title: string): void {
    let dialogRef = this.dialog.open(RemoveBookDialogComponent, {
      data: { title },
    });
    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.bookService.removeBook(this.book._id).subscribe((res) => {
          this.router.navigate(['/books']);
        });
      }
    });
  }

  onEditBookClick(id: string) {
    this.router.navigate([`books/book/edit/${id}`]);
  }

  onBackToLibraryClick() {
    this.router.navigate(['/books']);
  }
}
