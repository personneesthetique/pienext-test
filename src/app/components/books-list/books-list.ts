import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { BooksApi } from '../../api/books-api';
import { Book } from '../../models/book.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MAT_MODULES } from '../../app.config';

@Component({
  selector: 'app-books-list',
  imports: [...MAT_MODULES, FormsModule, ReactiveFormsModule],
  templateUrl: './books-list.html',
  styleUrl: './books-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksList {
  private router = inject(Router);
  private api = inject(BooksApi);

  protected filtersForm!: FormGroup;
  protected books!: Signal<Book[] | undefined>;

  constructor() {
    this.loadBooks();
    this.initForm();
  }

  loadBooks() {
    this.books = toSignal(this.api.getBooks());
  }

  openBook(id: string) {
    this.router.navigate(['/books', id]);
  }

  initForm() {
    this.filtersForm = new FormGroup({
      byTitle: new FormControl(''),
      byAuthor: new FormControl(''),
    });
  }

  filterBooks() {
    const filterValues = this.filtersForm.getRawValue();

    this.api.filterBooks(filterValues);
  }

  addBook() {
    this.router.navigate(['/book-form']);
  }
}
