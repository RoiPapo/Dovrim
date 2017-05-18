import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Discussion } from '../discussion.model'
import { Subject } from '../subject.model'

@Component({
  selector: 'app-run',
  templateUrl: './run.component.html',
  styleUrls: ['./run.component.scss']
})
export class RunComponent implements OnInit {
  @Input("playingDiscussion") discussionNow: Discussion;

  constructor() { }

  ngOnInit() {
    this.setData();
    this.totalDiscussionTime(this.discussionNow);
  }

  setData() {
    console.log(this.discussionNow);
  }

  totalDiscussionTime(discussion: Discussion) {
    let counter: number;
    let subjectarr: Subject[];
    
    subjectarr=discussion.subjects;
    console.log(subjectarr);
    for (let subject of discussion.subjects) {
      counter = subject.time;
    }

// look and subject and subjects on server DB and stuff
  }

}
