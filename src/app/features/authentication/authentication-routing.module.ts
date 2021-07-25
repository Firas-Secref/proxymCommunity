import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {Register2Component} from "./pages/register2/register2.component";

const routes: Routes = [
  {path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: Register2Component
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
