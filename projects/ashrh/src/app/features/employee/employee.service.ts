import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeesUrl = 'api/grh/employer/'; //'api/employees';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}
  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.employeesUrl).pipe(
      tap((_) => console.log('fetched employees')),
      catchError(this.handleError<any[]>('getEmployees', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** GET hero by id. Will 404 if id not found */
  getEmployee(id: number): Observable<any> {
    const url = `${this.employeesUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      tap((_) => console.log(`fetched hero id=${id}`)),
      catchError(this.handleError<any>(`getEmployee id=${id}`))
    );
  }

  /** PATCH: update the hero on the server */
  updateEmployee(hero: any): Observable<any> {
    return this.http.patch(this.employeesUrl, hero, this.httpOptions).pipe(
      tap((_) => console.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** POST: add a new hero to the server */
  addEmployee(employee: any): Observable<any> {
    return this.http
      .post<any>(this.employeesUrl, employee, this.httpOptions)
      .pipe(
        tap((newEmployee: any) =>
          console.log(`added employee w/ id=${newEmployee.id}`)
        ),
        catchError(this.handleError<any>('addEmployee'))
      );
  }

  /** DELETE: delete the hero from the server */
  deleteEmployee(employee: any | number): Observable<any> {
    const id = typeof employee === 'number' ? employee : employee.id;
    const url = `${this.employeesUrl}/${id}`;

    return this.http.delete<any>(url, this.httpOptions).pipe(
      tap((_) => console.log(`deleted employee id=${id}`)),
      catchError(this.handleError<any>('deleteEmployee'))
    );
  }
}
