import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {PublicationsCardComponent} from "./components/home/publications-card/publications-card.component";
import {CardProfileComponent} from "./components/home/card-profile/card-profile.component";
import {LoginComponent} from "./components/login/login.component";
import { NewPostCardComponent } from './components/home/new-post-card/new-post-card.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChatComponent } from './components/chat/chat.component';
import { RegisterComponent } from './components/register/register.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { HomeComponent } from './components/home/home.component';
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MatDialogModule} from "@angular/material/dialog";
import { NewPubComponent } from './components/home/new-post-card/new-pub/new-pub.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProfileComponent,
    CardProfileComponent,
    LoginComponent,
    PublicationsCardComponent,
    NewPostCardComponent,
    ProfileComponent,
    ChatComponent,
    RegisterComponent,
    EditProfileComponent,
    HomeComponent,
    NewPubComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
