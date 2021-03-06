import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BookList } from '../../models/books';
import { BookListService } from '../../services/list/book-list.service';


 @Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.scss']
})
export class BookInfoComponent implements OnInit {
  @Input() book: any;
  @Input() booksList : BookList;
  @Output() pushFavorite = new EventEmitter<any>();
  @Output() createCollection = new EventEmitter<string>();
  @Output() addToCollection = new EventEmitter<any>()
  @Output() refreshSuggestedBookList = new EventEmitter<any>();

  public addToCollectionVisible: boolean;

  constructor(private bookService: BookListService) { }

  ngOnInit() {
    this.addToCollectionVisible = false;
  }

  addFavorite() {
    this.pushFavorite.emit(this.book);
  }

  addSuggestedFavorite(book: any) {
    this.pushFavorite.emit(book);
  }

  refreshSuggestedBooks(recomBook) {
    this.bookService.searchBooks(recomBook.volumeinfo.title);
  }

  addItemCollection() {
    this.addToCollectionVisible = true;
  }

  addItemToCollection(collection: any) {
    this.addToCollection.emit(collection);
    this.addToCollectionVisible = false;
  }

  createNewCollection(nameNewCollection: string) {
    this.createCollection.emit(nameNewCollection);
  }
 }
