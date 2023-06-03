import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { share } from 'rxjs/operators';
// import { URLS } from '../../modeles';
import { Store, select } from '@ngrx/store';
import { authLogin } from './auth.actions';
// import { Observable } from 'rxjs';
import { selectAuth } from './auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ = this.store.pipe(select(selectAuth));
  constructor(
    // private http: HttpClient,
    private store: Store
  ) {}

  //   public log(data): Observable<any> {
  //     return this.http.post(URLS.LOGIN, data).pipe(share())
  //   }

  public authSucess(user) {
    this.store.dispatch(authLogin({ user }));
  }
}
