import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Book } from '../../models/book.interface';
import { Router } from '@angular/router';
import { BooksApi } from '../../api/books-api';
import { MAT_MODULES } from '../../app.config';

@Component({
  selector: 'app-book-form',
  imports: [ReactiveFormsModule, ...MAT_MODULES],
  templateUrl: './book-form.html',
  styleUrl: './book-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookForm implements OnInit {
  private router = inject(Router);
  private api = inject(BooksApi);

  protected addingForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.addingForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      coverUrl: new FormControl('', [Validators.required]),
    });
  }

  addBook() {
    const book: Book = {
      id: `${Date.now()}`,
      ...this.addingForm.getRawValue(),
    };
    this.api.addBook(book);
    this.backToBooksList();
  }

  cancelAddingBook() {
    this.backToBooksList();
  }

  backToBooksList() {
    this.router.navigate(['/books']);
  }
}
