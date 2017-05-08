import { Component } from '@angular/core';

@Component({
  selector: 'app-newdiscussion',
  templateUrl: './newdiscussion.component.html',
  styleUrls: ['./newdiscussion.component.css']
})
export class NewdiscussionComponent  {
 txtcontainer = document.getElementById("txtcontainer"); // the html div that contains subjects
 texts = this.txtcontainer.getElementsByTagName("p");

  constructor() { }

 getValuesFromContainer(){
   //todo: write a new get Value from container
     var inputsitem = {
        clocksarr:2 ,
        times:2 ,
    };
    
    return inputsitem;
 }


 submiting() { // creates json to please the lord node
    var discussionName = "cat";
    var textarr = [];
    var subject = [];
    var timetaker = this.getValuesFromContainer().clocksarr;
    for (var i = 0; i < this.texts.length; i++) {
        textarr.push(this.texts.item(i).innerHTML);
    }

    for (var i = 0; i < textarr.length; i++) {
        subject.push({ subjectName: textarr[i], subjectTime: timetaker[i] })
    }
    var datafordb = {
        discussionName: discussionName,
        subject: subject
    }

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/api/status');   //server name patch papo
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.send(JSON.stringify(datafordb));

}

}
