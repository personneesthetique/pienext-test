import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'books',
    loadComponent: () =>
      import('./components/books-list/books-list').then((c) => c.BooksList),
  },
  {
    path: 'books/:id',
    loadComponent: () =>
      import('./components/book-details/book-details').then(
        (c) => c.BookDetails
      ),
  },
  {
    path: 'book-form',
    loadComponent: () =>
      import('./components/book-form/book-form').then((c) => c.BookForm),
  },
];
