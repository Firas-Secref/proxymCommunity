import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";


import {NavbarComponent} from "./navbar/navbar.component";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from "@angular/material/core";
import {MDBBootstrapModule} from "angular-bootstrap-md";

import { AgePipe } from './pipes/age.pipe';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SuccessRegisterComponent } from './modals/success-register/success-register.component';
import { CustomSlicePipe } from './pipes/custom-slice.pipe';



@NgModule({
  declarations: [
    NavbarComponent,
    AgePipe,
    NotFoundComponent,
    SuccessRegisterComponent,
    CustomSlicePipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MDBBootstrapModule

  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    NavbarComponent,
    MatDatepickerModule,
    MatNativeDateModule,
    AgePipe,
    NotFoundComponent

  ],
  providers: [
    DatePipe
  ]

})
export class SharedModule { }
