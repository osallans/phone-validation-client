import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CognitoService } from './cognito.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  
  title = 'phone-validation-client';
  itemSelected='';
    
  isAuthenticated: boolean;

  constructor(private router: Router,
              private cognitoService: CognitoService) {
    this.isAuthenticated = false;
    //Get The routing event to catch the page and highlight the menu items
      router.events.subscribe((event) => 
      {
        if(event instanceof NavigationEnd) {
          if(event.url.indexOf('home')>-1) this.itemSelected='home';
          else this.itemSelected='home';
        }
      });
    }

    public ngOnInit(): void {
      this.cognitoService.isAuthenticated()
      .then((success: boolean) => {
        this.isAuthenticated = success;
      });
    }
  
    public signOut(): void {
      this.cognitoService.signOut()
      .then(() => {
        this.router.navigate(['/signIn']);
      });
    }
    }

  