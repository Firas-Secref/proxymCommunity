import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, NgModel, Validators} from "@angular/forms";

@Component({
  selector: 'app-register2',
  templateUrl: './register2.component.html',
  styleUrls: ['./register2.component.scss']
})
export class Register2Component implements OnInit {

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  imageFile!: File;
  imageUrl!: any;
  t = false;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.firstFormGroup = this.fb.group({
      firstname: ["", [Validators.required, Validators.maxLength(20), Validators.minLength(5)]],
      lastname: ["", [Validators.required, Validators.maxLength(20), Validators.minLength(5)]]
    });

    this.secondFormGroup = this.fb.group({
      username: ["", [Validators.required, Validators.maxLength(20), Validators.minLength(5)]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      email: ["", [Validators.required, Validators.email]],
      birthdate: ["",[Validators.required]]
    });

    this.thirdFormGroup = this.fb.group({
      city: ["", [Validators.required]],
      country: ["", [Validators.required]],
      address: ["", [Validators.required]],
      department: ["", [Validators.required]],
    });
  }


  readURL($event: any) {
    this.imageFile = $event.target.files[0];
    if(this.imageFile){
      const reader = new FileReader();
      console.log(this.imageFile)
      reader.readAsDataURL(this.imageFile);

      reader.onload = () =>{
        this.imageUrl = reader.result;
      }
    }

  }
}
