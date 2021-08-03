import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./features/private/pages/home/home.component";
import {NotFoundComponent} from "./shared/pages/not-found/not-found.component";
import {AuthGuard} from "./features/authentication/services/auth.guard";


const routes: Routes = [

  {path: "home",
    loadChildren: () => import('./features/private/private.module').then(m => m.PrivateModule),
    canActivate: [AuthGuard]
  },
  {
    path: "auth",
    loadChildren: () => import('./features/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: '**', component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
