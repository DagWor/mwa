import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BooksDataService } from '../books-data.service';
import { Book } from '../books-list/books-list.component';


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class BookDetailsComponent implements OnInit {

  title: string = "Book Details"
  update : boolean = false;
  dialog : boolean = false;
  btn : boolean = false;

  deleter() : void {
    if(!this.btn) this.btn = true
    else this.btn = false

    if(!this.dialog) this.dialog = true
    else this.dialog = false

  }

  goBack() {
    this.location.back();
  }
  
  deleteBook(bookId : any) : void {
    this.booksDataService.deleteBook(bookId!).then(res => {
      this.success(res)
      this.location.back()
    }).catch(err => this.error(err))
  }

  updater() : void {
    if(!this.update) this.update = true
    else this.update = false
  }

  book!: Book; // = [this.game01, this.game02]
  constructor(private location: Location, private route : ActivatedRoute, private booksDataService : BooksDataService) { }

  ngOnInit(): void {
    this.getBook();
  }

  private getBook() : void {
    let bookId = this.route.snapshot.params.bookId;
    this.booksDataService.getBook(bookId!).then(res => this.success(res)).catch(err => this.error(err))
  }

  private success(response : any){
    this.book = response;
  }

  private error(err : any){
    console.log(err);
  }
}
