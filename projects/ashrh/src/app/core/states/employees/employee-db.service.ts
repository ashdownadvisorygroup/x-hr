import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDbService {
  employee_url = '/api/grh/employee/';

  constructor(private httpClient: HttpClient) {}

  public loadEmployees() {
    return this.httpClient
      .get(environment.server + this.employee_url)
      .pipe(share());
  }
  public getEmployee(id: string) {
    return this.httpClient
      .get(environment.server + this.employee_url + id + '/')
      .pipe(share());
  }
  //path needed to delete employee
  public deleteEmployee(id: string) {
    return this.httpClient
      .delete(environment.server + this.employee_url + id + '/')
      .pipe(share());
  }

  createEmployee(formdata: FormData) {
    return this.httpClient
      .post(environment.server + this.employee_url, formdata)
      .pipe(share());
  }
  updateEmployee(id: string, params: any) {
    return this.httpClient
      .put(environment.server + `/api/grh/employee/${id}/`, params)
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
