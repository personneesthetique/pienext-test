import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksApi } from '../../api/books-api';
import { Book } from '../../models/book.interface';
import { MAT_MODULES } from '../../app.config';

@Component({
  selector: 'app-book-details',
  imports: [...MAT_MODULES],
  templateUrl: './book-details.html',
  styleUrl: './book-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private api = inject(BooksApi);

  protected book: WritableSignal<Book | undefined> = signal(undefined);

  ngOnInit() {
    this.getBookById();
  }

  getBookById() {
    const id = this.route.snapshot.paramMap.get('id');
    const book = this.api.getBookById(id);
    this.book.set(book);
  }

  backToBooksList() {
    this.router.navigate(['/books']);
  }
}
