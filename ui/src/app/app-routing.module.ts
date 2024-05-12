import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login/components/login-form/login-form.component';
import { EditBookComponent } from './library/components/book/edit-book/edit-book.component';
import { AddBookComponent } from './library/components/book/add-book/add-book.component';
import { BookDetailsComponent } from './library/components/book/book-details/book-details.component';
import { ListBooksComponent } from './library/components/book/list-books/list-books.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'books', component: ListBooksComponent },
  {
    path: 'books/book/add',
    component: AddBookComponent,
    canActivate: [authGuard],
  },
  {
    path: 'books/book/edit/:id',
    component: EditBookComponent,
    canActivate: [authGuard],
  },
  {
    path: 'books/book/details/:id',
    component: BookDetailsComponent,
  },
  { path: '**', component: ListBooksComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
