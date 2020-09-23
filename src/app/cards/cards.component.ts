import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {
  newKana = '';
  //@Output turns event into event that can be listened to on the outside parent component
  @Output() kanaCreated = new EventEmitter();

  resetKana() {
    this.newKana = "";
  }

  onAddKana(value) {
    this.newKana += value;

  }
  submitKana() {
    console.log(this.newKana);
    const kana = {
      hiragana: this.newKana
    };
    //eventemitter sending kana as argument
    this.kanaCreated.emit(kana);
    this.resetKana();
  }
}
//send event to app.component which than sends to post-create
