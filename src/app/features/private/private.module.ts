import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChatComponent} from "./pages/chat/chat.component";
import {EditProfileComponent} from "./pages/edit-profile/edit-profile.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {HomeComponent} from "./pages/home/home.component";
import {CardProfileComponent} from "./pages/home/card-profile/card-profile.component";
import {NewPostCardComponent} from "./pages/home/new-post-card/new-post-card.component";
import {NewPubComponent} from "./pages/home/new-post-card/new-pub/new-pub.component";
import {PublicationsCardComponent} from "./pages/home/publications-card/publications-card.component";
import {SharedModule} from "../../shared/shared.module";
import { PrivateRoutingModule } from './private-routing.module';
import {MatStepperModule} from "@angular/material/stepper";



@NgModule({
  declarations: [
    ChatComponent,
    EditProfileComponent,
    ProfileComponent,
    HomeComponent,
    CardProfileComponent,
    NewPostCardComponent,
    NewPubComponent,
    PublicationsCardComponent,

  ],
  exports: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PrivateRoutingModule,
    MatStepperModule

  ]
})
export class PrivateModule { }
