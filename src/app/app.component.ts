import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'phone-validation-client';
  itemSelected='';
    constructor(
        private router: Router
    ) {

      //Get The routing event to catch the page and highlight the menu items
      router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        if(event.url.indexOf('home')>-1) this.itemSelected='home';
        else this.itemSelected='home';
      }
    
    });
    }

  }