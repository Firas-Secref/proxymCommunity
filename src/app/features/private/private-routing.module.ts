import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {EditProfileComponent} from "./pages/edit-profile/edit-profile.component";
import {UsersListComponent} from "./pages/home/users-list/users-list.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "profile",
    component: ProfileComponent
  },
  {
    path: "edit",
    component: EditProfileComponent
  },
  {
    path: "usersList",
    component: UsersListComponent
  }


];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
