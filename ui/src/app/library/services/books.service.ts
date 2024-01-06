import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Book } from '../interfaces/book';

// TODO: Update inputs to enforce book

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  BASE_URL = 'http://localhost:3000/books';

  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<Book[]> {
    return this.http
      .get<Book[]>(this.BASE_URL)
      .pipe(catchError(this.handleError<Book[]>('getAllBooks', [])));
  }

  getBookDetails(id: string): Observable<Book> {
    const url = `${this.BASE_URL}/book/details/${id}`;
    return this.http
      .get<Book>(url)
      .pipe(catchError(this.handleError<Book>('getBookDetails', undefined)));
  }

  addBook(book: Book) {
    const url = `${this.BASE_URL}/book/add/`;
    return this.http
      .post<Book>(url, { ...book })
      .pipe(catchError(this.handleError<Book>('addBook', undefined)));
  }

  updateBook(id: string, book: Book) {
    const url = `${this.BASE_URL}/book/update/${id}`;
    return this.http
      .put<Book>(url, { ...book })
      .pipe(catchError(this.handleError<Book>('updateBook', undefined)));
  }

  removeBook(id: string) {
    const url = `${this.BASE_URL}/book/remove/${id}`;
    return this.http
      .delete<Book>(url)
      .pipe(catchError(this.handleError<Book>('removeBook', undefined)));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} caused the following error: ${error}`);
      return of(result as T);
    };
  }
}
