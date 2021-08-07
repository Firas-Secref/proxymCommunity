import {Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {NewPubComponent} from "./new-pub/new-pub.component";
import {Developer} from "../../../../../model/Developer";
import {map, mergeMap} from "rxjs/operators";
import {PubService} from "../../../services/pub.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Publication} from "../../../../../model/Publication";
import {UserService} from "../../../services/user.service";
import {ToastrService} from "ngx-toastr";
import {InteractionService} from "../../../services/interaction.service";

@Component({
  selector: 'app-new-post-card',
  templateUrl: './new-post-card.component.html',
  styleUrls: ['./new-post-card.component.scss']
})
export class NewPostCardComponent implements OnInit, OnChanges {

  constructor(private modalService: NgbModal, private pubSservice : PubService, private fb: FormBuilder,
              private userService: UserService, private toastr: ToastrService, private interaction: InteractionService) { }
  @Input() userInput!: Developer;
  @Output() updatePosts = new EventEmitter<any>()
  publicationForm!: FormGroup;
  image!: File;
  loaded1: any;
  selectedCategorie!: string;
  newPost!: Publication
  ngOnInit(): void {
    this.initForm()
  }

  openDialog(content: any) {
    this.modalService.open(content, { size: 'md' })
    // const dialogRef = this.dialog.open(NewPubComponent, {
    //   width: "50%",
    //   data: {firstName: this.userInput.firstName,
    //   lastname: this.userInput.lastName,
    //   userImage: this.userInput.profileImage}
    // });


  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("haha",this.userInput)
  }

  initForm(){
    this.publicationForm = this.fb.group({
      text: [""]
    })
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
    formData.append("user", JSON.stringify(this.userInput));

    this.pubSservice.newPost(formData).subscribe((newPost: Publication) =>{
      this.newPost = newPost;
      this.updatePosts.emit(this.newPost)
      this.toastr.success("Post Added successfully ..")
    })
  }

}
