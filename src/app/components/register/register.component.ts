import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DeveloperService} from "../../services/developer.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  constructor(private fb: FormBuilder, private service: DeveloperService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.registerForm = this.fb.group({
      username: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    })
  }

  register() {
    console.log(this.registerForm.value);
    this.service.firstRegister(this.registerForm.value).subscribe((data: any)=>{
      console.log("added successfully")
    })
  }
}
