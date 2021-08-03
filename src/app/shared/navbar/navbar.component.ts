import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

  }


  logout() {
    localStorage.clear();
    this.router.navigateByUrl("auth/login");
  }

  goHome() {
    this.router.navigateByUrl("home")
  }

  goToChat() {
    this.router.navigateByUrl("home/chat")
  }

  goToProfile() {
    this.router.navigateByUrl("home/profile");
  }
}
