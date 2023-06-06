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
export class ContractEmployeeDbService {
  contract_url = '/api/grh/contract_employees/';

  requestOptions = {
    headers: new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type'
    })
  };
  constructor(private httpClient: HttpClient) {}

  public loadContractsEmployee() {
    //console.log('that is headers',headers);
    return this.httpClient
      .get(environment.server + '/api/grh/contract_employees/')
      .pipe(share());
  }
  public getContractEmployee(id: string) {
    return this.httpClient
      .get(environment.server + this.contract_url + id + '/')
      .pipe(share());
  }
  //path needed to delete employee
  public deleteContractEmployee(id: string) {
    return this.httpClient
      .delete(environment.server + this.contract_url + 'update/' + id + '/')
      .pipe(share());
  }

  createContractEmployee(data: any) {
    return this.httpClient
      .post(environment.server + this.contract_url, data)
      .pipe(share());
  }
  updateContractEmployee(id: string, params: any) {
    // console.log(`modification of employee ${id}`,params);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      Authorization: `Token ${JSON.parse(localStorage.getItem('ASHRH-TOKEN'))}`
    });

    const requestOptions = { headers: headers };

    return this.httpClient
      .patch(environment.server + this.contract_url + id + '/', params)
      .pipe(share());
  }

  queryContractsEmployee(params: any) {
    // return this.httpClient.get(environment.server + employee_url, { params }).pipe(share())
    return this.httpClient
      .get(environment.server + '/api/grh/contract_employees/', { params })
      .pipe(share());
  }

  updateStateContractsEmployee(ids: string[], state: boolean) {
    return this.httpClient
      .put(environment.server + `/api/grh/update_state_contracts_employees/`, {
        ids,
        state
      })
      .pipe(share());
  }
}
