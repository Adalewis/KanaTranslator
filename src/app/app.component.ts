import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  storedKana = '';
    onPostKanaAdded(kana) {
      //this.storedKana.push(kana);
      this.storedKana = kana;
    }
  }
