import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { share } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {
  ContractData,
  GroupData,
  PostData
} from '../../features/settings-employ/settings-employ.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbListService {
  groups_url = '/api/grh/working_groups/';
  post_url = '/api/grh/posts/';
  contract_url = '/api/grh/contracts/';

  constructor(private httpclient: HttpClient) {}

  public getWorkingGroups(): Observable<GroupData[]> {
    return this.httpclient
      .get<GroupData[]>(environment.server + this.groups_url)
      .pipe(share());
  }
  public getPosts(): Observable<PostData[]> {
    return this.httpclient
      .get<PostData[]>(environment.server + this.post_url)
      .pipe(share());
  }
  public addWorkingGroup(element: GroupData) {
    return this.httpclient
      .post(environment.server + this.groups_url, element)
      .pipe(share());
  }
  public addPost(element: PostData) {
    return this.httpclient
      .post(environment.server + this.post_url, element)
      .pipe(share());
  }
  public addContract(element: ContractData) {
    return this.httpclient
      .post(environment.server + this.contract_url, element)
      .pipe(share());
  }
  public updateWorkingGroup(element: GroupData) {
    return this.httpclient
      .put(environment.server + this.groups_url + element.id + '/', element)
      .pipe(share());
  }
  public updatePost(element: PostData) {
    return this.httpclient
      .put(environment.server + this.post_url + element.id + '/', element)
      .pipe(share());
  }
  public deleteWorkingGroup(element: GroupData) {
    return this.httpclient
      .delete(environment.server + this.groups_url + element.id + '/')
      .pipe(share());
  }
}
