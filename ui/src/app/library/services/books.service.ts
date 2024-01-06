import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Book } from '../interfaces/book';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  // TODO: Add a book interface
  baseUrl = 'http://localhost:3000/books';
  constructor(private http: HttpClient) {}

  // This will return Book[]
  getAllBooks(): Observable<Book[]> {
    const url = this.baseUrl;
    return this.http
      .get<Book[]>(url)
      .pipe(catchError(this.handleError<Book[]>('getAllBooks', [])));
  }

  // This will return Book
  getBookDetails(id: string): Observable<Book> {
    const url = `${this.baseUrl}/book/details/${id}`;
    return this.http
      .get<Book>(url)
      .pipe(catchError(this.handleError<Book>('getBookDetails', undefined)));
  }

  // This will return Book
  addBook(book: any) {
    const url = `${this.baseUrl}/book/add/`;
  }

  // This will return Book
  editBook(id: string, book: any) {
    const url = `${this.baseUrl}/book/update/${id}`;
  }

  // This will return null
  removeBook(id: string) {
    const url = `${this.baseUrl}/book/remove/${id}`;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
