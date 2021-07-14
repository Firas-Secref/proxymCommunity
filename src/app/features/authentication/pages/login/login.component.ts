import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  constructor(private fb : FormBuilder, private service: LoginService,  private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    })
  }


  login() {
    this.service.login(this.loginForm.value).subscribe((data: boolean)=>{
      if(data){
        localStorage.setItem("username", this.loginForm.value.username)
        this.router.navigateByUrl("accueil");
      }
    })
  }
}
