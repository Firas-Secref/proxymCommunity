import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CardProfileComponent } from './components/card-profile/card-profile.component';
import { PublicationsCardComponent } from './components/publications-card/publications-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CardProfileComponent,
    PublicationsCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
