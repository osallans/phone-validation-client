import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';





const routes: Routes = [
  { path: 'home', component: HomeComponent,data: { animation: 'home' } },
  { path: '', redirectTo: 'home', pathMatch: 'full',  data: { animation: 'home' } } 
];


//export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });


@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
