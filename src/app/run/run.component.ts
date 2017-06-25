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


  isCollapsed: boolean = true;
  discussionNow: Discussion = { _id: null, discussionName: "", subject: [] };
  subjNum: number;
  clockPointer: number = 0;
  subjecstArr: Subject[];
  presentedTime: number = 0;
  isPaused: boolean = true;
  totalTime: string;
  isMuted: boolean = true;
  automaticMode: boolean = false;
  timesUp: boolean = false;
  isSkippedHandleMode: boolean = false;


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
      this.presentedTime = this.subjecstArr[0].subjectTime * 60;
    }

  }

  totalDiscussionTime(discussion: Discussion) { //sums up the total discussion time
    let counter: number = 0;
    for (let subject of this.discussionNow.subject) {
      counter += + subject.subjectTime;
    }
    this.totalTime = "אורך הדיון: " + Math.round(counter) + " דקות";
  }




  play() {
    let that = this;
    this.timesUp = false;
    this.isPaused = false;
    this.presentedTime = Math.round(this.subjecstArr[this.clockPointer].subjectTime * 60);
    var interval = setInterval(function () {
      if (that.isPaused == true) {
        clearInterval(interval);
        that.presentedTime++;
      }
      that.presentedTime--;
      if (that.presentedTime == -1) {
        clearInterval(interval);
        if (that.automaticMode || this.isSkippedHandleMode == true) {
          that.ringBell();
          that.ifNextClock();
          if (that.presentedTime == -1) { that.presentedTime++ }
        }
        else {
          if (that.presentedTime == -1) { that.presentedTime++ }
          that.timeExceeded();
          
          //  this.timesUp = false;
        }
      }
    }, 1000)
  }

  skip(input) {
    if (this.subjecstArr[this.clockPointer + 1]) {
      if (this.automaticMode) {// for automatic mode
        this.presentedTime = input;
        if (this.isPaused == true) {
          this.clockPointer++;
          this.presentedTime = this.subjecstArr[this.clockPointer].subjectTime * 60;
        }
      }
      else {// for handy mode
        if (this.timesUp) {
          this.isPaused = true;
          this.isSkippedHandleMode == false;
        }
        else {
          this.isSkippedHandleMode = true;
          this.presentedTime = input;
          this.clockPointer++;
          this.presentedTime = this.subjecstArr[this.clockPointer].subjectTime * 60;

        }
      }
    }
  }



  ifNextClock() {
    console.log("1wsfdf");
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



  pause() {
    this.isPaused = true;
    this.subjecstArr[this.clockPointer].subjectTime = Math.floor((this.presentedTime / 60) * 100) / 100;

  }

  update(i, event) {
    if (event.target.value !== this.subjecstArr[i].subjectTime) {
      this.subjecstArr[i].subjectTime = event.target.value;
    }
  }

  toggleTimer(event) {
    if (event.target.checked) {
      this.play()
    }
    else {
      this.pause();
    }
  }

  up(i: number) {
    if (this.subjecstArr[i - 1] && this.clockPointer == i - 2) {
      let keeper = this.subjecstArr[i - 1];
      this.subjecstArr[i - 1] = this.subjecstArr[i];
      this.subjecstArr[i] = keeper;
    }
    else {
      alert("לא ניתן להחליף דיון פעיל  / פעולה בלתי חוקית");
    }
  }
  down(i: number) {
    if (this.subjecstArr[i + 1] && this.clockPointer == i - 1) {
      let keeper = this.subjecstArr[i + 1];
      this.subjecstArr[i + 1] = this.subjecstArr[i];
      this.subjecstArr[i] = keeper;
    }
    else {
      alert("לא ניתן להחליף דיון פעיל  / פעולה בלתי חוקית");
    }
  }

  ringBell() {
    if (!this.isMuted) {
      var audio = new Audio();
      audio.src = "http://localhost:4200/assets/Bell.mp3";
      audio.load();
      audio.play();
    }
  }

  mute() {
    this.isMuted = true;
  }

  unMute() {
    this.isMuted = false;
  }

  timeExceeded() {//time counter to tell the speaker that times up
    let that = this;
    this.timesUp = true;
    var interval = setInterval(function () {
      that.presentedTime++;
      if (that.isPaused) {
        clearInterval(interval);
        that.ifNextClock();
      }
    }, 1000)
  }

  changeMode() {
    if (this.automaticMode) {
      this.automaticMode = false;
    }
    else {
      this.automaticMode = true;
    }
  }


}






