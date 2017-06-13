import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { Discussion } from '../discussion.model'
import { Subject } from '../subject.model'
import { RequestService } from '../requests.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap/collapse';

@Component({
  selector: 'app-run',
  templateUrl: './run.component.html',
  styleUrls: ['./run.component.scss']
})
export class RunComponent implements OnInit {
  //@Input("selectedDiscussion") discussionNow: Discussion;
  

  isCollapsed:boolean = true;
  discussionNow: Discussion = { _id: null, discussionName: "", subject: [] };
  subjNum: number;
  clockPointer: number = 0;
  subjecstArr: Subject[];
  clocksArr: number[] = [];
  presentedTime: number = 0;
  isPaused: boolean = false;

  constructor(private requestService: RequestService,
    private activatedRoute: ActivatedRoute) { }


  ngOnInit() {
    // subscribe to router event
    this.activatedRoute.params.subscribe((params: Params) => {
      let discusisonId = params['id'];
      this.getTheDiscussionFromDb(discusisonId);
    });



    // this.discussionPasserService.discussionPicked.subscribe(
    //   (selectedDiscussion: Discussion) => {
    //   this.discussionNow = selectedDiscussion;
    //     this.decapsulation(this.discussionNow);
    //     this.totalDiscussionTime(this.discussionNow);
    //   });
    // // this.logData();     
  }


  getTheDiscussionFromDb(id) {
    this.requestService.getSpesificDiscussion(id)
      .subscribe(
      discussion => {
        this.discussionNow = discussion;
        this.decapsulation(this.discussionNow);
        this.totalDiscussionTime(this.discussionNow);
      },
      err => {
        console.log(err)
      })
  }

  logData() {
    console.log(this.discussionNow);
  }



  decapsulation(discussion: Discussion) { // just a discussion parse to "easy to work with" varriebles
    this.subjNum = discussion.subject.length;
    this.subjecstArr = discussion.subject;
    for (let subject of this.discussionNow.subject) {
      this.clocksArr.push(subject.subjectTime);
      this.presentedTime = this.clocksArr[0] * 60;
    }

  }

  totalDiscussionTime(discussion: Discussion) { //sums up the total discussion time
    let counter: number = 0;
    for (let subject of this.discussionNow.subject) {
      counter += + subject.subjectTime;
    }
    console.log("this discussion long is: " + counter + " minutes");
  }

  play() {
    let that = this;
    this.isPaused = false;
    this.presentedTime = this.clocksArr[this.clockPointer] * 60;
    var interval = setInterval(function () {
      if (that.isPaused == true) {
        clearInterval(interval);
        that.presentedTime++;
      }
      that.presentedTime--;
      if (that.presentedTime == -1) {
        clearInterval(interval);
        that.ifNextClock();
        if (that.presentedTime == -1) { that.presentedTime++ }
      }
    }, 1000)
  }

  ifNextClock() {
    if (this.subjNum > this.clockPointer + 1) {
      this.clockPointer++;
      this.play();
    } else { this.presentedTime == 0; }
  }

  secondsToMinutes(time) {//convetrs sec to min for presentation
    var minutes = Math.floor(time / 60);
    var seconds = time - minutes * 60;
    if (seconds < 10)
      var result = minutes + ":" + "0" + seconds;
    else
      var result = minutes + ":" + seconds;
    return result;
  }

  skip(input) {
    this.presentedTime = input;
    if (this.isPaused == true) { this.clockPointer++ }
  }

  pause() {
    this.isPaused = true;
    this.clocksArr[this.clockPointer] = (this.presentedTime / 60);
  }

  update(i, event) {
    if (event.target.value !== this.clocksArr[i]) {
      this.clocksArr[i] = event.target.value;
    }
  }




}






