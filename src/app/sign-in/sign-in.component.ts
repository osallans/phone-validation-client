import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { IUser, CognitoService } from '../cognito.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {

  loading: boolean;
  user: IUser;
  errorMessage:String='';
  constructor(private router: Router,
              private cognitoService: CognitoService) {
    this.loading = false;
    this.user = {} as IUser;
  }

  public signIn(): void {
    this.loading = true;
    this.cognitoService.signIn(this.user)
    .then((resp) => {
      console.log(resp);
      this.router.navigate(['/home']);
    }).catch((er) => {
      console.error(er);
      if(er.message.indexOf('username')>-1)
      this.errorMessage='Incorrect email or password !';
    if(er.message.indexOf('exist')>-1)
      this.errorMessage='User already exists !';
      this.loading = false;
    });
  }

}