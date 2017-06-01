import { Component } from '@angular/core';
import { Discussion } from './discussion.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedFeature = 'home';
  selectedDiscussion: Discussion;
  editFlag: boolean = false;

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }

  onRun(selectedDiscussionToRun: Discussion) {
    this.loadedFeature = "run";
    this.selectedDiscussion = selectedDiscussionToRun;
  }

  onEdit(selectedDiscussionToEdit: Discussion, flag: boolean) {
    this.loadedFeature = "newDiscussion"
    this.selectedDiscussion = selectedDiscussionToEdit;
    this.editFlag = flag;
  }


}
