import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@Injectable({
  providedIn: 'root',
})

@NgModule({
  
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
  ],
  providers: [AppComponent]
  
})
export class AppModule { }
