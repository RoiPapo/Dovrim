import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MydiscussionComponent } from './mydiscussion/mydiscussion.component';
import { NewdiscussionComponent } from './newdiscussion/newdiscussion.component';
import { RunComponent } from './run/run.component';
import { EmitterService } from './emitter.service';
import { RequestService } from './requests.service';

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
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    EmitterService,
    RequestService
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
