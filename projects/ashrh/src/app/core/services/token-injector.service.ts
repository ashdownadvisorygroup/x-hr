import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpHeaders
} from '@angular/common/http';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Observable } from 'rxjs';

// let httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//     // 'Content-Type':'multipart/form-data; application/json',
//     Accept: 'application/json',
//     //'Authorization': `Bearer ${JSON.parse(localStorage.getItem('ASHRH-TOKEN'))}`,
//     Authorization: `Token ${localStorage.getItem('ASHRH-TOKEN')}`
//     //'x-access-token': JSON.parse(localStorage.getItem('ASHRH-TOKEN')),
//     //"Access-Control-Allow-Origin": "*",
//     //"Access-Control-Allow-Credentials": "true",
//     //"Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
//     //"Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",

//     //'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('ASHRH-TOKEN'))
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class TokenInjectorService implements HttpInterceptor {
  constructor(private localeStorage: LocalStorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Token ${this.localeStorage.getItem('TOKEN')}`
      }
    });

    // req = req.clone(httpOptions);

    //console.log('that is TokenInjectorService', )
    return next.handle(req);
  }
}
