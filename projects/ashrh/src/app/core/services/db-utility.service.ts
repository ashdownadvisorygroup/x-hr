import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { share } from 'rxjs/operators';
import { PeriodData } from '../../features/settings-employ/settings-employ.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbUtilityService {
  periods_url = '/api/grh/working_period/';
  post_groups_period_url = '/api/grh/post_groups_period/';

  constructor(private httpclient: HttpClient) {}

  public getPostGroupsPeriod(): Observable<any> {
    return this.httpclient
      .get<any[]>(environment.server + this.post_groups_period_url)
      .pipe(share());
  }

  public getWorkingPeriod(): Observable<PeriodData[]> {
    return this.httpclient
      .get<PeriodData[]>(environment.server + this.periods_url)
      .pipe(share());
  }

  public addWorkingPeriod(element: PeriodData) {
    console.log('trying to add a period:');
    console.log(element);
    return this.httpclient
      .post(environment.server + this.periods_url, element)
      .pipe(share());
  }
  public updateWorkingPeriod(element: PeriodData) {
    console.log('updating name --->', element);
    //  console.log(element);
    return this.httpclient
      .put<any[]>(
        environment.server + this.periods_url + element.id + '/',
        element
      )
      .pipe(share());
  }
  public deleteWorkingPeriod(element: PeriodData) {
    return this.httpclient
      .delete(environment.server + this.periods_url + element.id + '/')
      .pipe(share());
  }
}
