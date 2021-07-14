import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {SharedModule} from "../../shared/shared.module";
import { AuthenticationRoutingModule } from './authentication-routing.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthenticationRoutingModule,
  ]
})
export class AuthenticationModule { }
