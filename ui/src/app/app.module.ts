import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AddBookComponent } from './library/components/book/add-book/add-book.component';
import { EditBookComponent } from './library/components/book/edit-book/edit-book.component';
import { ListBooksComponent } from './library/components/book/list-books/list-books.component';
import { LoginFormComponent } from './login/components/login-form/login-form.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BookDetailsComponent } from './library/components/book/book-details/book-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { AuthInterceptorProvider } from './login/services/auth.interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { RemoveBookDialogComponent } from './library/components/book/remove-book-dialog/remove-book-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    BookDetailsComponent,
    AddBookComponent,
    EditBookComponent,
    ListBooksComponent,
    LoginFormComponent,
    RemoveBookDialogComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatListModule,
    MatDialogModule,
  ],
  providers: [AuthInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
