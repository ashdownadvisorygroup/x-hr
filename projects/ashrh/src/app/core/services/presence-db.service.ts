import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { share } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PresenceDbService {

  public static TYPE_ARRIVE = 'arrive'
  public static TYPE_LEAVE = 'leave'
  constructor(
    private httpClient: HttpClient
  ) { }

  public arrive(employer_id: string, type: string) {
    return this.httpClient.post(environment.server + `/api/grh/presence/`, { employer_id, type }).pipe(share())
  }
  public depart(id: string) {
    return this.httpClient.get(environment.server + `/api/grh/presence/${id}/`).pipe(share())
  }
}
