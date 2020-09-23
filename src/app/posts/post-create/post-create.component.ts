import { Component, Input } from "@angular/core";
import { NgForm } from "@angular/forms";

import { PostsService } from "../posts.service";
//Input- post property bindable from outside direct parent component
@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent {
  @Input() enteredContent = "";
  newKana = '';
  constructor(public postsService: PostsService) {}


  resetKana() {
    this.newKana = "";
    this.enteredContent.hiragana = "";

  }
//form: NgForm gives access to values of forms
  onAddPost(form: NgForm) {
    this.newKana = this.enteredContent.hiragana;
    if (form.invalid) {
      if (this.newKana !== "") {
      form.value.title = this.newKana;
      this.postsService.addPost(form.value.title, form.value.content);
      this.resetKana();
      form.resetForm();
      }
      return;
    }
    this.postsService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }
}
