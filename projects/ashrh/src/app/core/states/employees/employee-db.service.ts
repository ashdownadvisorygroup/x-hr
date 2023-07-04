import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { share } from 'rxjs/operators';
let httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('ASHRH-TOKEN'))}`
    //'Authorization': 'JWT ' + JSON.parse(localStorage.getItem('ASHRH-TOKEN'))
  })
};

@Injectable({
  providedIn: 'root'
})
export class EmployeeDbService {
  employee_url = '/api/grh/employee/';
  contract_employee_url = '/api/grh/contract_employees/';
  download_contract_employee_url = '/api/grh/contract_pdf/';

  requestOptions = {
    headers: new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type'
    })
  };
  constructor(private httpClient: HttpClient) {}

  public loadEmployees() {
    //console.log('that is headers',headers);
    return this.httpClient
      .get(environment.server + '/api/grh/employees_list/')
      .pipe(share());
  }
  public getEmployee(id: string) {
    return this.httpClient
      .get(environment.server + this.employee_url + id + '/')
      .pipe(share());
  }
  public getContractEmployee(id: string) {
    return this.httpClient
      .get(environment.server + this.contract_employee_url + id + '/')
      .pipe(share());
  }
  //path needed to delete employee
  public deleteEmployee(id: string) {
    return this.httpClient
      .delete(environment.server + this.employee_url + 'update/' + id + '/')
      .pipe(share());
  }

  // public downloadContractEmployee() {
  //   return this.httpClient
  //     .get(environment.server + this.download_contract_employee_url + '/')
  //     .pipe(share());
  // }

  public downloadContractEmployee(id: string) {
    // console.log(`modification of employee ${id}`,params);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      Authorization: `Token ${JSON.parse(localStorage.getItem('ASHRH-TOKEN'))}`
    });

    const requestOptions = { headers: headers };
    let params = { employee_id: id };

    return this.httpClient
      .post(environment.server + `/api/grh/contract_pdf/`, params, {
        responseType: 'arraybuffer'
      })
      .pipe(share());
  }

  public downloadBadgeEmployee(id: string) {
    // console.log(`modification of employee ${id}`,params);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      Authorization: `Token ${JSON.parse(localStorage.getItem('ASHRH-TOKEN'))}`
    });

    const requestOptions = { headers: headers };
    let params = { employee_id: id };

    return this.httpClient
      .post(environment.server + `/api/grh/badge_pdf/`, params, {
        responseType: 'arraybuffer'
      })
      .pipe(share());
  }

  regenerateQRCode(id: string) {
    // console.log(`modification of employee ${id}`,params);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      Authorization: `Token ${JSON.parse(localStorage.getItem('ASHRH-TOKEN'))}`
    });

    const requestOptions = { headers: headers };
    let params = { employee_id: id };

    return this.httpClient
      .put(
        environment.server + `/api/grh/employee/regenerateQRCode/${id}/`,
        params
      )
      .pipe(share());
  }

  createEmployee(formdata: any) {
    return this.httpClient
      .post(environment.server + this.employee_url, formdata)
      .pipe(share());
  }
  updateEmployee(id: string, params: any) {
    // console.log(`modification of employee ${id}`,params);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      Authorization: `Token ${JSON.parse(localStorage.getItem('ASHRH-TOKEN'))}`
    });

    const requestOptions = { headers: headers };

    return this.httpClient
      .patch(environment.server + `/api/grh/employee/update/${id}/`, params)
      .pipe(share());
  }

  queryEmployees(params: any) {
    // return this.httpClient.get(environment.server + employee_url, { params }).pipe(share())
    return this.httpClient
      .get(environment.server + '/api/grh/employees_list/', { params })
      .pipe(share());
  }

  updateStateEmployees(ids: string[], state: boolean) {
    return this.httpClient
      .put(environment.server + `/api/grh/update_state_employees/`, {
        ids,
        state
      })
      .pipe(share());
  }
}
