import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import {MatChipsModule} from '@angular/material/chips';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SnotifyModule, SnotifyService, ToastDefaults} from 'ng-snotify';
import { NotifyService } from './shared/services/utilities/notify.service';
import { DatePipe } from '@angular/common';
import { ServerTableComponent } from './shared/server-table/server-table.component';
import { HttpRequestsService } from './shared/services/utilities/http-request.service';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from './shared/services/utilities/modal.service';
import { ErrorInterceptor } from './shared/services/utilities/error.interceptor';
import { NumbersOnly } from './shared/commonFunctions/numbersOnly.directive';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from './shared/confirmation-dialog/confirmation-dialog.service';
import { MatCarouselModule } from '@ngbmodule/material-carousel';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { EditorModule } from '@tinymce/tinymce-angular';
import { HomeService } from './shared/services/api/home.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ProfileComponent } from './profile/profile.component';

 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ServerTableComponent,
    NumbersOnly,
    ConfirmationDialogComponent,
    ConfirmationDialogComponent,
    SignUpComponent,
    SignInComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    EditorModule,
    NgbModule,
    ReactiveFormsModule,
    SnotifyModule.forRoot(),
    MatCarouselModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot()
    ],
  providers: [
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService,
    NotifyService,
    HomeService,
    ConfirmationDialogService,DatePipe,
    ModalService, 
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    HttpRequestsService

  ], 
  entryComponents: [ ConfirmationDialogComponent ],
  bootstrap: [AppComponent] 
})
@NgModule({
  declarations: [
    AppComponent,    
    HomeComponent,
    ServerTableComponent,
    NumbersOnly,
    ConfirmationDialogComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
