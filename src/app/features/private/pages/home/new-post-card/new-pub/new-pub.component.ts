import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../../../services/user.service";
import {map, mergeMap} from "rxjs/operators";
import {Developer} from "../../../../../../model/Developer";
import {Publication} from "../../../../../../model/Publication";
import {PubService} from "../../../../services/pub.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";


@Component({
  selector: 'app-new-pub',
  templateUrl: './new-pub.component.html',
  styleUrls: ['./new-pub.component.scss']
})
export class NewPubComponent implements OnInit {

  image!: File;
  loaded1: any;
  publicationForm!: FormGroup;

  categories = ["Web", "Mobile", "FullStack", "Back-end", "Front-end",
    "React", "Spring-Boot", "Angular", "iOS", "Android", "Java", "Kotlin", "Java-script"];

  selectedCategorie!: string;
  constructor(private fb: FormBuilder, private service: UserService, private pubService: PubService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.initForm();
  }

  onFileChanged(event: any) {
    this.image = event.target.files[0];
    console.log(this.image);
    var reader = new FileReader();
    reader.readAsDataURL(this.image);
    reader.onload = ()=>{
      this.loaded1 = reader.result;
    }

  }

  publier() {
    console.log(this.loaded1)
    console.log(this.publicationForm.value.text)
    let formData = new FormData();
    if (this.loaded1){
      formData.append("pubImage", this.image);
    }
    let pubText = this.publicationForm.value.text;
    let categorie = this.selectedCategorie;

    const pub = new Publication(pubText, categorie);
    formData.append("pub", JSON.stringify(pub));
    this.service.getUserByUsername(localStorage.getItem('username')).subscribe((data: Developer) =>{
      console.log(data)
      formData.append("user", JSON.stringify(data));
    })

    this.service.getUserByUsername(localStorage.getItem('username')).pipe(
      mergeMap((data1) =>{
        console.log(data1)
        formData.append("user", JSON.stringify(data1));
        return this.pubService.newPost(formData).pipe(
          map(data2 =>{
            console.log(data2)

          })
        )
      })
    ).subscribe();
  }



  initForm(){
    this.publicationForm = this.fb.group({
      text: [""]
    })
  }
}
