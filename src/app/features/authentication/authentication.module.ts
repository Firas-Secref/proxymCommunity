import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {SharedModule} from "../../shared/shared.module";
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { Register2Component } from './pages/register2/register2.component';
import {MatStepperModule} from "@angular/material/stepper";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    Register2Component
  ],
  exports: [
    RegisterComponent,
    Register2Component
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthenticationRoutingModule,
    MatStepperModule,
    MatInputModule,
  ]
})
export class AuthenticationModule { }
