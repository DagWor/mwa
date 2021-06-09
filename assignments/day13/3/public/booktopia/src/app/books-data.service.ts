import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Book } from './books-list/books-list.component';

@Injectable({
  providedIn: 'root'
})
export class BooksDataService {
  private BASE_URL: string = "http://localhost:5000/api"

  constructor(private http: HttpClient) { }

  public getBooks(offset?: any, count?: any): Promise<Book[]> {
    let url!: string;
    if (offset) url = this.BASE_URL + '/books?offset=' + offset;
    else if (count) url = this.BASE_URL + '/books?count=' + count;
    else if (count && offset) url = this.BASE_URL + '/books?count=' + count + '&offset=' + offset;
    else url = this.BASE_URL + '/books';

    return this.http.get(url).toPromise().then(this.success).catch(this.error);
  }

  public getBook(bookId: string): Promise<Book> {
    const url: string = this.BASE_URL + '/book/' + bookId;
    return this.http.get(url).toPromise().then(this.success).catch(this.error);
  }

  public deleteBook(bookId: string): Promise<Book> {
    const url: string = this.BASE_URL + '/book/' + bookId;
    return this.http.delete(url).toPromise().then(this.success).catch(this.error);
  }

  private success(response: any) {
    return response;
  }

  private error(err: any) {
    console.log(err);
    return null;
  }
}
