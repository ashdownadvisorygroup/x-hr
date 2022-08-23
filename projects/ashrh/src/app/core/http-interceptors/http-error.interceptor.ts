/*
import { Injectable, Injector, ErrorHandler } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
*/
//** Passes HttpErrorResponse to application-wide error handler */
/*
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap({
        error: (err: any) => {
          if (err instanceof HttpErrorResponse) {
            const appErrorHandler = this.injector.get(ErrorHandler);
            appErrorHandler.handleError(err);
          }
        }
      })
    );
  }
}
*/
import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
//import { TokenStorageService } from '../_services/token-storage.service';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Observable } from 'rxjs';
import { Token } from '@angular/compiler';
const TOKEN_HEADER_KEY = 'Authorization';
const TOKEN_HEADER_KEY1 = 'x-access-token';

// let httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//  //  'Content-Type':'multipart/form-data; application/json',
//    'Accept': 'application/json',
//     //'Authorization': `Bearer ${JSON.parse(localStorage.getItem('ASHRH-TOKEN'))}`,
//    // 'Authorization': `Token ${JSON.parse(localStorage.getItem('ASHRH-TOKEN'))}`,
//    'Authorization': `Token ${localStorage.getItem('ASHRH-TOKEN')}`,
//     //'x-access-token': JSON.parse(localStorage.getItem('ASHRH-TOKEN')),
//     //"Access-Control-Allow-Origin": "*",
//     //"Access-Control-Allow-Credentials": "true",
//     //"Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
//     //"Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",

//     //'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('ASHRH-TOKEN'))
//   })
// };

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private localStorage: LocalStorageService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.localStorage.getItem('TOKEN');
    //  console.log('that is token !!!!!!!!!!!!', token);
    if (token != null) {
      // authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
      authReq = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          //  'Accept': '*/*',
          //  'Accept-Encoding':'gzip, deflate, br',
          Authorization: `Token ${JSON.parse(
            localStorage.getItem('ASHRH-TOKEN')
          )}`
        }
      });
      //  console.log('that is headers :)', `${JSON.parse(localStorage.getItem('ASHRH-TOKEN'))}`);
      //  authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, token) });
      // authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
      // authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY1, token) });
      //authReq = req.clone({  setHeaders: {Access-Control-Allow-Origin: "*"} });
      /*
      const headers = new HttpHeaders();
      headers.set(TOKEN_HEADER_KEY1,token);
      headers.set('Content-Type', 'application/json; charset=utf-8');
      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');
      headers.set('Access-Control-Allow-Headers', 'Content-Type');
      headers.set('Access-Control-Allow-Origin', '*');
      headers.set('Access-Control-Allow-Credentials', 'true');
      headers.set('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
      headers.set(
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
      );
      console.log('that is headers',headers);

     // authReq.clone({ headers: headers });
     authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY1, token) });
 */
    }
    return next.handle(authReq);
  }
}
/*
export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
];
*/
