import { Component } from '@angular/core';
import{Discussion} from './discussion.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   loadedFeature = 'home';
   playingDiscussion: Discussion;

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }

  onRun(selectedDiscussion: Discussion){
    this.loadedFeature = "run";
    this.playingDiscussion=selectedDiscussion;
  }

  
}
