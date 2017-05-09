import { Component, Output } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Subject } from '../subject.model'

@Component({
    selector: 'app-newdiscussion',
    templateUrl: './newdiscussion.component.html',
    styleUrls: ['./newdiscussion.component.css']
})
export class NewdiscussionComponent {
    discussionName: string;
    inputs: Subject[] = [];
    
    constructor() { }

    addLink() {
        this.inputs.push({ name:"default" , time:10  });
    }

    // getValuesFromContainer() {
    //     //todo: write a new get Value from container
    //     var inputsitem = {
    //         clocksarr: 2,
    //         times: 2,
    //     };

    //     return inputsitem;
    // }


    // submiting() { // creates json to please the lord node
    //     var discussionName = "cat";
    //     var textarr = [];
    //     var subject = [];
    //     var timetaker = this.getValuesFromContainer().clocksarr;
    //     for (var i = 0; i < this.texts.length; i++) {
    //         textarr.push(this.texts.item(i).innerHTML);
    //     }

    //     for (var i = 0; i < textarr.length; i++) {
    //         subject.push({ subjectName: textarr[i], subjectTime: timetaker[i] })
    //     }
    //     var datafordb = {
    //         discussionName: discussionName,
    //         subject: subject
    //     }

    //     var xhr = new XMLHttpRequest();
    //     xhr.open('POST', 'http://localhost:3000/api/status');   //server name patch papo
    //     xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    //     xhr.send(JSON.stringify(datafordb));

    // }

}
