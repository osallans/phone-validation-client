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
  isChosen='';
    
  isAuthenticated: boolean;

  constructor(private router: Router,
              private cognitoService: CognitoService) {
    this.isAuthenticated = false;
    //Get The routing event to catch the page and highlight the menu items
      router.events.subscribe((event) => 
      {
        this.cognitoService.isAuthenticated()
        .then((success: boolean) => {
          this.isAuthenticated = success;
        });
        if(event instanceof NavigationEnd) {
          console.log(event.url);
          if(event.url.indexOf('home')>-1) this.isChosen='home';
          else if(event.url.indexOf('signout')>-1) this.isChosen='signout';
          else if(event.url.indexOf('profile')>-1) this.isChosen='profile';
          else if(event.url.indexOf('signIn')>-1 || event.url.indexOf('signUp')>-1  ) this.isChosen='signin';
          else this.isChosen='home';
          console.log(this.isChosen);
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
        this.isAuthenticated=false;
        this.router.navigate(['/signIn']);
      });
    }
    }

  