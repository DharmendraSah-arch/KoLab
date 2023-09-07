import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';
import { TokenInterceptor } from './interceptors/token.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    routingComponents

  ],
    imports: [    
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,   
    FormsModule,
    HttpClientModule,
    NgToastModule
 
  ],
 providers:[{
 provide:HTTP_INTERCEPTORS,
 useClass:TokenInterceptor,
 multi:true
 }],

  bootstrap: [AppComponent]
})
export class AppModule { }
