import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { BooksDataService } from "../books-data.service";

export class Book {
  _id!: number;
  year!: number;
  edition!: number;
  title!: string;
  author!: {
    name: string
  };
  rating!: number;
  price!: number
}

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {

  add: boolean = false;
  btn: boolean = false;
  title: string = "These are all the books: "
  offset: number = 0;
  count: number = 5;

  next: boolean = false;
  previous: boolean = false;

  books: Book[] = [];
  constructor( private route : ActivatedRoute, private booksDataService: BooksDataService) { }

  ngOnInit(): void {
    this.getGames();
  }

  adder() : void {
    this.add = true;
  }

  btner() {
    this.btn = true;
  }

  addBook(form: NgForm): void {
    console.log(form.value)
  }

  nextPage() : void {
    this.offset += 5
    this.count += 5
    if (this.offset == 0) this.previous = true
    this.getGames(this.offset, this.count)
  }
  previousPage() : void{
    if (this.offset == 0) {
      this.previous = true
      this.offset -= 5
      this.count -= 5
      this.getGames(this.offset, this.count)

    }
  }

  private getGames(offset?: any, count?: any): void {
    this.booksDataService.getBooks(offset, count).then(res => this.success(res)).catch(err => this.error(err))
  }

  private success(response: Book[]) {
    this.books = response;
  }

  private error(err: any) {
    console.log(err);
  }
}
