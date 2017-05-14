import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Discussion } from '../discussion.model';
import { RequestService } from '../requests.service';
import { EmitterService } from '../emitter.service';

@Component({
  selector: 'app-mydiscussion',
  templateUrl: './mydiscussion.component.html',
  styleUrls: ['./mydiscussion.component.css']
})
export class MydiscussionComponent implements OnInit {
  discussions: Discussion[];

  constructor(private requestService: RequestService) { }





  ngOnInit() {
    this.loadDiscussions();
  }

  loadDiscussions() {// get all discussions
    this.requestService.getDiscussions()
      .subscribe(
      discussions => this.discussions = discussions,
      // discussions => console.log(discussions),
      err => {
        console.log(err)

      }

      )

  }

}
