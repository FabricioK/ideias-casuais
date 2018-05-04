import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Gtag } from 'angular-gtag'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'app';
  constructor(private router: Router, gtag: Gtag) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log(event.urlAfterRedirects);
        gtag.pageview({ page_path: event.urlAfterRedirects });
      }
    });
  }

  scrollHandler(e) {
    console.log(e)
    // should log top or bottom
  }

}
