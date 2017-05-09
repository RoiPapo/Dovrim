import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MydiscussionComponent } from './mydiscussion/mydiscussion.component';
import { NewdiscussionComponent } from './newdiscussion/newdiscussion.component';
import { RunComponent } from './run/run.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MydiscussionComponent,
    NewdiscussionComponent,
    RunComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
