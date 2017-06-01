import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Discussion } from '../discussion.model';
import { RequestService } from '../requests.service';
import { EmitterService } from '../emitter.service';
import { DiscussionPasserService } from '../discussionPasser.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mydiscussion',
  templateUrl: './mydiscussion.component.html',
  styleUrls: ['./mydiscussion.component.css']
})
export class MydiscussionComponent implements OnInit {

  discussions: Discussion[];

  constructor(private requestService: RequestService,
   private discussionPasserService:DiscussionPasserService,
   private router:Router
   ) { 

    // this.discussionPasserService.discussionPicked.subscribe(
    //   (selectedDiscussion: Discussion) => console.log(selectedDiscussion));
   }


  // @Output() selectedDiscussionToRun = new EventEmitter<Discussion>();
  // @Output() selectedDiscussionToEdit = new EventEmitter<{discussion:Discussion,flag:boolean}>();



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

  runDiscussion(discussionNum: number) {
    // this.selectedDiscussionToRun.emit(this.discussions[discussionNum]);
    this.discussionPasserService.discussionPicked.emit(this.discussions[discussionNum]);
    this.router.navigate(['run']);
  }
  removeDiscussion(i) {
    //todo
  }
  editDiscussion(discussionNum: number) {
    // this.selectedDiscussionToEdit.emit({discussion:this.discussions[discussionNum],flag:true});
  }



}
