import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AppRoutes } from './modeles/app-routes';
import { HomeComponent } from './features/home/home.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/authentification/authentification.module').then(m => m.AuthentificationModule),
    // pathMatch: 'full'
  },
  { path: AppRoutes.home,
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
    component: HomeComponent
  },
  { path: 'check-presence', loadChildren: () => import('./features/check-presence/check-presence.module').then(m => m.CheckPresenceModule) },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  // useHash supports github.io demo page, remove in your app
  imports: [
    RouterModule.forRoot(routes, {
      // useHash: true,
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
