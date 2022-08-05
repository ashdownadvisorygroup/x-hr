import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EndShiftService {
  daily_output_url = '/api/grh/daily_output/';
  //daily_output_url = '/api/grh/dailyoutput/';
  constructor(private httpClient: HttpClient) {}


/*
  public getEndShift(params) {
    return this.httpClient.get(environment.server + this.daily_output_url, {
      params
    });
  }
*/

public getEndShift() {
 // return this.httpClient.get(environment.server + this.daily_output_url);
 return this.httpClient.get(environment.server + this.daily_output_url);
}

public getDailyOutputSpecific(id:any) {
  return this.httpClient.get(environment.server + this.daily_output_url + id + '/').pipe(take(1)).subscribe((res: any) => {
    console.log('that is resultat of specific daily output',res);
  });

}


  public updateEndShift(element: any) {
    return this.httpClient.patch(
      environment.server + this.daily_output_url + element.id + '/',
      element
    );
  }
  public addEndShift(element: any) {
    return this.httpClient.post(
      environment.server + this.daily_output_url,
      element
    );
  }
  public deleteEndShift(element: any) {
    return this.httpClient.delete(
      environment.server + this.daily_output_url + element.id + '/',
      element
    );
  }
}
