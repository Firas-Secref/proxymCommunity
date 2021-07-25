import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, NgModel, Validators} from "@angular/forms";
import {Developer} from "../../../../model/Developer";
import {allProfiles} from "../../../../core/profile";
import {RegisterService} from "../../services/register.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-register2',
  templateUrl: './register2.component.html',
  styleUrls: ['./register2.component.scss']
})
export class Register2Component implements OnInit {

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  fourthFormGroup!: FormGroup;
  imageFile!: File;
  imageUrl!: any;
  user!: Developer;
  allProfiles = allProfiles;
  profile!: string;
  department!: string;
  birthdate!: any;
  constructor(private fb: FormBuilder, private service: RegisterService,
              private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.initForm();
    console.log(allProfiles)
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

    this.fourthFormGroup = this.fb.group({
      profile: ["", [Validators.required]]
    })
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

  check1() {
    if(!this.firstFormGroup.valid){
      document.getElementById("first_name")!.classList.add("required");
      document.getElementById("last_name")!.classList.add("required");

    }else{
      document.getElementById("first_name")!.classList.remove("required");
      document.getElementById("first_name")!.classList.remove("required");
    }

  }

  check2() {

    if(!this.secondFormGroup.valid){
      document.getElementById("username")!.classList.add("required");
      document.getElementById("password")!.classList.add("required");
      document.getElementById("email")!.classList.add("required");
      document.getElementById("birthdate")!.classList.add("required");

    }else{
      document.getElementById("username")!.classList.remove("required");
      document.getElementById("password")!.classList.remove("required");
      document.getElementById("email")!.classList.remove("required");
      document.getElementById("birthdate")!.classList.remove("required");
    }
  }

  check3() {
    console.log(this.fourthFormGroup.value.profile)
  }

  submit() {
    this.birthdate=this.datePipe.transform(this.secondFormGroup.value.birthdate,
      'yyyy-MM-dd')!;

    console.log(this.birthdate)
    this.user = new Developer(
      this.firstFormGroup.value.firstname,
      this.firstFormGroup.value.lastname,
      this.secondFormGroup.value.username,
      this.secondFormGroup.value.password,
      // this.datePipe.transform(this.secondFormGroup.value.birthdate,
      //   'yyyy-MM-dd'),
      this.secondFormGroup.value.email,
      this.thirdFormGroup.value.city,
      this.thirdFormGroup.value.address,
      this.thirdFormGroup.value.country,
      this.thirdFormGroup.value.department,
      this.fourthFormGroup.value.profile,
      1255,
    );
    console.log(this.user)
    console.log(this.birthdate)
    console.log(this.imageFile)
    let formData = new FormData();
    formData.append("profileImg", this.imageFile);
    formData.append("user", JSON.stringify(this.user));
    this.service.register(formData).subscribe((data: any)=>{
      console.log("register OK !!")
      console.log(data)
    })
  }

  checkCheckBoxvalue($event: any) {
    this.profile = $event.target.defaultValue
    console.log(this.profile)
  }

  getDepartment($event: any) {
    this.department=$event.target.value
    console.log(this.department)
  }
}
