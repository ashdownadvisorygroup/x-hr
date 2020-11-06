import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { share } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { SafewareData } from '../../features/settings-employ/settings-employ.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbDepartmentsService {
  department_url: string = '/api/grh/post/';
  constructor(
    private httpclient: HttpClient
  ) { }
    // do not forget to put correct url
  public getDepart(element: SafewareData) {

    return this.httpclient.get(environment.server + '/' + element.id + this.department_url).pipe(share())
  }
  public addDepart( element: SafewareData) {
    // console.log('Sending data');
    // console.log(element);
    return this.httpclient.post(environment.server + this.department_url, element).pipe(share())
  }
  public updateDepart( element: SafewareData) {
    console.log(element.id);

    return this.httpclient.put(environment.server + this.department_url + element.id +'/', element).pipe(share())
  }
  public deleteDepart(element: SafewareData) {

    return this.httpclient.delete(environment.server+ this.department_url + element.id+ '/' ).pipe(share())
  }

  public getAllDepart(): Observable<SafewareData[]>  {

    return this.httpclient.get<SafewareData[]>(environment.server  + this.department_url).pipe(share());
  }


}
