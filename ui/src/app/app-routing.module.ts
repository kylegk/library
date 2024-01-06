import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login/components/login-form/login-form.component';
import { EditBookComponent } from './library/components/book/edit-book/edit-book.component';
import { AddBookComponent } from './library/components/book/add-book/add-book.component';
import { UpdateBookComponent } from './library/components/book/update-book/update-book.component';
import { RemoveBookComponent } from './library/components/book/remove-book/remove-book.component';
import { BookDetailsComponent } from './library/components/book/book-details/book-details.component';
import { ListBooksComponent } from './library/components/book/list-books/list-books.component';

// TODO: Add a wildcard route "**" with a PageNotFoundComponent
// TODO: Add a redirect
// TODO: Check canActivate, etc. in https://angular.io/guide/router

const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'books', component: ListBooksComponent },
  { path: 'books/book/add', component: AddBookComponent, canActivate: [] },
  { path: 'books/book/edit/:id', component: EditBookComponent },
  { path: 'books/book/update/:id', component: UpdateBookComponent },
  { path: 'books/book/remove/:id', component: RemoveBookComponent },
  { path: 'books/book/details/:id', component: BookDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
