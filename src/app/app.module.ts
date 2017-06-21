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
import { DiscussionPasserService } from './discussionPasser.service';
import { HomeComponent } from './home/home.component';
import {Routes, RouterModule} from "@angular/router";
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AnalogClockComponent } from './analog-clock/analog-clock.component';

const appRoutes: Routes=[
  {path:'',component:HomeComponent},
  {path:'discussions',component:MydiscussionComponent},
  {path:'run/:id',component:RunComponent},
  {path:'edit/:id',component:NewdiscussionComponent},
  {path:'create',component:NewdiscussionComponent}
  ];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MydiscussionComponent,
    NewdiscussionComponent,
    RunComponent,
    HomeComponent,
    AnalogClockComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    CollapseModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [
    EmitterService,
    RequestService,
    DiscussionPasserService
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
