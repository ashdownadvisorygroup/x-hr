import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from '../../modeles/app-routes';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor(
    private router: Router
  ) { }

  public goHome(){
    this.router.navigate(['/' + AppRoutes.home])
  }
}
