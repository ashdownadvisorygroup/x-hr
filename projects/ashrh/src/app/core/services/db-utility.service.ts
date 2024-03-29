import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { share } from 'rxjs/operators';
import {
  ContractData,
  ContractEmployeeData,
  DepartmentData,
  LeaveTypesData,
  PeriodData,
  PostData
} from '../../features/settings-employ/settings-employ.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbUtilityService {
  periods_url = '/api/grh/working_period/';
  contract_url = '/api/grh/contracts/';

  contract_employee_url = '/api/grh/contract_employees/';
  post_groups_period_url = '/api/grh/post_groups_period/';
  post_url = '/api/grh/posts/';
  department_url = '/api/main/departments/';
  leaves_type_url = '/api/grh/leave_types/';
  leaves_type_url2 = '/api/grh/leaveTypes_list/';

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

  public getPosts(): Observable<PostData[]> {
    return this.httpclient
      .get<PostData[]>(environment.server + this.post_url)
      .pipe(share());
  }
  public getContractEmployees(): Observable<ContractEmployeeData[]> {
    return this.httpclient
      .get<ContractEmployeeData[]>(
        environment.server + this.contract_employee_url
      )
      .pipe(share());
  }

  public getDepartment(): Observable<DepartmentData[]> {
    return this.httpclient
      .get<DepartmentData[]>(environment.server + this.department_url)
      .pipe(share());
  }

  public getContract(): Observable<ContractData[]> {
    return this.httpclient
      .get<ContractData[]>(environment.server + this.contract_url)
      .pipe(share());
  }
  public getContractEmployee(id?: string): Observable<ContractEmployeeData[]> {
    if (id) {
      return this.httpclient
        .get<ContractEmployeeData[]>(
          environment.server + this.contract_employee_url + '?employee_id=' + id
        )
        .pipe(share());
    }
    return this.httpclient
      .get<ContractEmployeeData[]>(
        environment.server + this.contract_employee_url
      )
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
      .patch<any[]>(
        environment.server + this.periods_url + element.id + '/',
        element
      )
      .pipe(share());
  }
  public updateContract(element: ContractData) {
    return this.httpclient
      .put<any[]>(
        environment.server + this.contract_url + element.id + '/',
        element
      )
      .pipe(share());
  }
  public updatePost(element: PeriodData) {
    return this.httpclient
      .patch<any[]>(
        environment.server + this.post_url + element.id + '/',
        element
      )
      .pipe(share());
  }
  public deleteContract(element: ContractData) {
    return this.httpclient
      .delete(environment.server + this.contract_url + element.id + '/')
      .pipe(share());
  }

  public getContracts(): Observable<ContractData[]> {
    return this.httpclient
      .get<ContractData[]>(environment.server + this.contract_url)
      .pipe(share());
  }

  public deleteLeaveTypes(element: LeaveTypesData) {
    return this.httpclient
      .delete(environment.server + this.leaves_type_url + element.id + '/')
      .pipe(share());
  }

  public getLeaveTypes(): Observable<LeaveTypesData[]> {
    return this.httpclient
      .get<LeaveTypesData[]>(environment.server + this.leaves_type_url)
      .pipe(share());
  }

  public getAllLeaveTypes(): Observable<LeaveTypesData[]> {
    return this.httpclient
      .get<LeaveTypesData[]>(environment.server + this.leaves_type_url2)
      .pipe(share());
  }
  public deletePost(element: PostData) {
    return this.httpclient
      .delete(environment.server + this.post_url + element.id + '/')
      .pipe(share());
  }
}
