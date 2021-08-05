import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  constructor(private fb : FormBuilder, private service: LoginService,  private router: Router,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    })
  }


  login(content: any) {
    this.service.login(this.loginForm.value).subscribe((data: boolean)=>{
      if(data){
        localStorage.setItem("username", this.loginForm.value.username)
        this.router.navigateByUrl("home");
      }else{
        this.modalService.open(content, { size: 'md' });
      }
    })
  }

  goToRegister() {
    this.router.navigateByUrl("auth/register")
  }

}
