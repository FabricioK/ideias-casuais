import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'app';
  constructor() { }

  scrollHandler(e) {
    console.log(e)
    // should log top or bottom
  }
  
}