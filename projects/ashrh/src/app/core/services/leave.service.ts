// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class LeaveService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { share } from 'rxjs/operators';
// let httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${JSON.parse(localStorage.getItem('ASHRH-TOKEN'))}`
//     //'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('ASHRH-TOKEN'))
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  leaves_url = '/api/grh/leave/';

  requestOptions = {
    headers: new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type'
    })
  };
  constructor(private httpClient: HttpClient) {}

  public loadLeavesTypes() {
    //console.log('that is headers',headers);
    return this.httpClient
      .get(environment.server + '/api/grh/leaveTypes_list/')
      .pipe(share());
  }

  public loadLeaves() {
    //console.log('that is headers',headers);
    return this.httpClient
      .get(environment.server + '/api/grh/leave_list/')
      .pipe(share());
  }
  public getLeaves(id: string) {
    return this.httpClient
      .get(environment.server + this.leaves_url + id + '/')
      .pipe(share());
  }
  //path needed to delete employee
  public deleteLeaves(id: string) {
    return this.httpClient
      .delete(environment.server + this.leaves_url + 'update/' + id + '/')
      .pipe(share());
  }

  createLeaves(formdata: any) {
    return this.httpClient
      .post(environment.server + '/api/grh/leave_list/', formdata)
      .pipe(share());
  }
  updateLeaves(id: string, params: any) {
    // console.log(`modification of employee ${id}`,params);

    return this.httpClient
      .patch(environment.server + `/api/grh/leave/update/${id}/`, params)
      .pipe(share());
  }

  queryLeaves(params: any) {
    // return this.httpClient.get(environment.server + leaves_url, { params }).pipe(share())
    return this.httpClient
      .get(environment.server + '/api/grh/leave_list/', params)
      .pipe(share());
  }
  getLeaveAndEventsBetweenDate(params: any) {
    // return this.httpClient.get(environment.server + leaves_url, { params }).pipe(share())
    console.log('that is params', params);
    return this.httpClient
      .get(environment.server + '/api/grh/leave_list/between_date/', params)
      .pipe(share());
  }

  // updateStateEmployees(ids: string[], state: boolean) {
  //   return this.httpClient
  //     .put(environment.server + `/api/grh/update_state_employees/`, {
  //       ids,
  //       state
  //     })
  //     .pipe(share());
  // }
}
