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



@NgModule({
  declarations: [
    NavbarComponent
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
    MatNativeDateModule

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
    MatNativeDateModule

  ],
  providers: [
    DatePipe
  ]

})
export class SharedModule { }
