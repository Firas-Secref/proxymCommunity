import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Developer} from "../../../../model/Developer";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  profile = ["Web Developer", "Mobile Developer", "iOS Developer",
    "Android Developer", "Front-end Developer", "Back-end Developer", "Full-Stack Developer",
    "Flutter", "Angular", "React Native", "React Js", "Java", "Spring-Boot"];

  departement = ["DigiX Team", "Banking Lab"];

  profileForm!: FormGroup;
  selcetedProfile!: string;
  selectedDepartment!: string;
  currentDev!: Developer;
  isSet: boolean = false;
  avatar!: any;
  profileImg!: File;

  constructor(private service: UserService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm();
    this.service.getUserByUsername(localStorage.getItem("username")).subscribe((data: Developer) => {
      console.log(data)
      this.currentDev = data;
      this.profileForm.patchValue({
        username: data.username,
        email: data.email,
        nom: data.firstName,
        prenom: data.lastName,
        profile: data.profile,
        departement: data.departement,
        address: data.address,
        pays: data.pays,
        codePostal: data.codePostal,
        aPropos: data.aPropos
      })
      this.avatar = "data:image/png;base64,"+data.profileImage
      // console.log(data.profileImage)
    })
  }

  initForm() {
    this.profileForm = this.fb.group({
      username: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      nom: ["", [Validators.required]],
      prenom: ["", [Validators.required]],
      profile: ["pr1", Validators.required],
      departement: ["", [Validators.required]],
      address: ["", [Validators.required]],
      pays: ["", [Validators.required]],
      ville: ["", [Validators.required]],
      codePostal: [, [Validators.required]],
      aPropos: [""]
    })
  }

  changeProfile($event: any) {
    this.profileForm.patchValue({
      profile: $event.target.value
    })
  }

  validateChanges() {
    console.log(this.profileForm.value)
    const username = this.profileForm.value.username
    const nom = this.profileForm.value.nom;
    const prenom = this.profileForm.value.prenom;
    const email = this.profileForm.value.email;
    const profile = this.profileForm.value.profile;
    const departement = this.profileForm.value.departement;
    const address = this.profileForm.value.address;
    const pays = this.profileForm.value.pays;
    const ville = this.profileForm.value.ville;
    const codePostal = this.profileForm.value.codePostal;
    const aPropos = this.profileForm.value.aPropos;

    let user = new Developer(nom, prenom, username, email, ville, address, pays, departement, profile, codePostal, aPropos);

    console.log(this.currentDev)

    console.log("qsxfwfsdf", user)
    this.service.updateUser(this.currentDev.id, user).subscribe((data: any) => {
      console.log("updated");
      console.log(data)
    })
  }

  changeDepartment($event: any) {
    this.profileForm.patchValue({
      departement: $event.target.value
    })
  }

  onFileChanged($event: any) {
    this.profileImg = $event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.profileImg);
    this.updateImage(this.profileImg)

    reader.onload = () => {
      this.avatar = reader.result;
    }
  }

  updateImage(image: any){
    let formData = new FormData();
    formData.append("image", image);
    console.log(formData)
    this.service.updateProfileImage(this.currentDev.id, formData).subscribe((data: any)=>{
      console.log(data);
      console.log("success");
    })
  }

  readImageFile(file: any): any{
    let reader = new FileReader();
    reader.readAsDataURL(file);
    return reader.onload = () =>{
      reader.result
    }
  }
}