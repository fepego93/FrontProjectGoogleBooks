import { Component, OnInit } from '@angular/core';
import { Store, } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import * as layout from '../../actions/layout';
import { BookListService } from '../../../books-main/services/list/book-list.service';
import { ThrowStmt } from '../../../../../node_modules/@angular/compiler';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase';
import { FavoritesService } from '../../../favorites/services/favorites.service';
import { Observable } from '../../../../../node_modules/rxjs';
import { CollectionsService } from '../../../collections/services/collections.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss']
})
export class TopNavBarComponent implements OnInit {

  state: string;
  isOpenprofile: boolean;
  user: User;
  favoriteList: Observable<any[]>;
  favoritesCount: number;
  collectionsCount: number;

  constructor(private bookService: BookListService, 
    private store: Store<fromRoot.State>,
    private authFire: AngularFireAuth,
    private favoriteServices:FavoritesService,
    private collectionServices: CollectionsService,
    private router: Router) { 

  }

  ngOnInit() {
    this.isOpenprofile = false;
    this.authFire.authState
    .subscribe(
      user => {
        this.user = user;
        this.favoriteServices.listFavorites(this.user).valueChanges().subscribe(
          list => {
              this.favoritesCount = list.length;
          });
        this.collectionServices.listCollections(this.user).valueChanges().subscribe (collections =>{
          this.collectionsCount = collections.length;
        });
      }
    );
  }

  open() {
    if (this.state === 'close') {
      this.state = 'open';
      this.store.dispatch(new layout.OpenSideNav());
    } else {
      this.state = 'close';
      this.store.dispatch(new layout.CloseSideNav());
    }
  }

  searchBooks(text: string) {
    this.router.navigateByUrl('/');
    this.bookService.searchBooks(text, 0, 20);
  }

  openProfileInfo() {
    if(this.isOpenprofile) {
      this.isOpenprofile = false;
    } else {
      this.isOpenprofile = true;
    }
  }

  getFavoritesCount() {

  }

}
