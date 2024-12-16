import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { share } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PresenceDbService {
  presences_url = '/api/grh/presences_details/';
  public static TYPE_ARRIVE = 'arrive';
  public static TYPE_LEAVE = 'leave';
  constructor(private httpClient: HttpClient) {}

  public arrive(employer_id: string, type: string) {
    return this.httpClient
      .post(environment.server + `/api/grh/presence/`, {
        employee: employer_id,
        type
      })
      .pipe(share());
  }
  public depart(id: string) {
    return this.httpClient
      .get(environment.server + `/api/grh/presence/${id}/`)
      .pipe(share());
  }

  // getPresenceListBetweenDate(params: any) {
  //   // return this.httpClient.get(environment.server + leaves_url, { params }).pipe(share())
  //   console.log('that is params ===========>>', params);
  //   return this.httpClient
  //     .get(environment.server + '/api/grh/presences_list/', params)
  //     .pipe(share());
  // }

  getPresenceListBetweenDate(params: any) {
    // return this.httpClient.get(environment.server + leaves_url, { params }).pipe(share())
    console.log('that is params ===========>>', params);
    return this.httpClient
      .get(
        environment.server + '/api/grh/attendances/presence_by_date/',
        params
      )
      .pipe(share());
  }

  // public getPresences(params: any) {
  //   console.log('that is params ===========>> a', params);
  //   return this.httpClient
  //     .get(
  //       environment.server + `/api/grh/attendances/presence_by_date/`,
  //       params
  //     )
  //     .pipe(share());
  // }
  public getPresences(params: any) {
    console.log('that is params ===========>> a', params);
    return this.httpClient
      .get(environment.server + `/api/grh/presences_details/`, { params })
      .pipe(share());
  }
}
