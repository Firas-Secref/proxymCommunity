import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-new-pub',
  templateUrl: './new-pub.component.html',
  styleUrls: ['./new-pub.component.scss']
})
export class NewPubComponent implements OnInit {

  images: File[]=[];
  loaded1: any;
  loaded2: any;
  publicationForm!: FormGroup;
  formData = new FormData();

  categories = ["Web", "Mobile", "FullStack", "Back-end", "Front-end",
    "React", "Spring-Boot", "Angular", "iOS", "Android", "Java", "Kotlin", "Java-script"];

  selectedCategorie?: string;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  onFileChanged(event: any) {
    this.images = event.target.files;
    console.log(this.images);
    var reader = new FileReader();
    reader.readAsDataURL(this.images[0]);
    reader.onload = ()=>{
      this.loaded1 = reader.result;
    }
  }

  publier() {
    console.log(this.loaded1)
  }

  initForm(){
    this.publicationForm = this.fb.group({
      text: ["Quoi de neuf ?"]
    })
  }
}
