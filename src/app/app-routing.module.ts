import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./features/private/pages/home/home.component";


const routes: Routes = [
  {path: "home",
    loadChildren: () => import('./features/private/private.module').then(m => m.PrivateModule)
  },
  {
    path: "auth",
    loadChildren: () => import('./features/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: '**', component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
