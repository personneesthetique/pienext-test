import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../models/book.interface';
import { FilterValues } from '../models/filter-values.interface';

@Injectable({
  providedIn: 'root',
})
export class BooksApi {
  private books: Book[] = [
    {
      id: '1',
      title: 'Моя барба',
      description: 'Про барбу',
      author: 'Олег Иваницкий',
      coverUrl: '1.jpeg',
    },
    {
      id: '2',
      title: 'Моя барба',
      description: 'Про барбу',
      author: 'Олег Иваницкий',
      coverUrl: '1.jpeg',
    },
    {
      id: '3',
      title: 'Твоя барба',
      description: 'Про барбу',
      author: 'Олег Иваницкий',
      coverUrl: '1.jpeg',
    },
    {
      id: '4',
      title: 'Моя барба',
      description: 'Про барбу',
      author: 'Олеггг Иваницкий',
      coverUrl: '1.jpeg',
    },
    {
      id: '5',
      title: 'Его барба',
      description: 'Про барбу',
      author: 'Олег Иваницкий',
      coverUrl: '1.jpeg',
    },
    {
      id: '6',
      title: 'Моя барба',
      description: 'Про барбу',
      author: 'Олег Ианицкий',
      coverUrl: '1.jpeg',
    },
    {
      id: '7',
      title: 'Моя барба',
      description: 'Про барбу',
      author: 'Олег Ваницкий',
      coverUrl: '1.jpeg',
    },
    {
      id: '8',
      title: 'М барба',
      description: 'Про барбу',
      author: 'Олег Иваницкий',
      coverUrl: '1.jpeg',
    },
    {
      id: '9',
      title: 'Мо барба',
      description: 'Про барбу',
      author: 'Олег Иваницкий',
      coverUrl: '1.jpeg',
    },
    {
      id: '10',
      title: 'моя барба',
      description: 'Про барбу',
      author: 'Олег Иваницкий',
      coverUrl: '1.jpeg',
    },
  ];

  private books$ = new BehaviorSubject(this.books);

  getBooks() {
    return this.books$.asObservable();
  }

  getBookById(id: string | null) {
    return this.books$.getValue().find((book) => book.id === id) as Book;
  }

  filterBooks(filterValues: FilterValues) {
    const byTitle = filterValues.byTitle.toLowerCase();
    const byAuthor = filterValues.byAuthor.toLowerCase();

    const filteredBooks = this.books.filter((book) => {
      const title = book.title.toLowerCase();
      const author = book.author.toLowerCase();

      const isTitleMatch = title.includes(byTitle);
      const isAuthorMatch = author.includes(byAuthor);

      return isTitleMatch && isAuthorMatch;
    });

    this.books$.next(filteredBooks);
  }

  addBook(book: Book) {
    this.books.push(book);
    this.books$.next(this.books);
  }
}
