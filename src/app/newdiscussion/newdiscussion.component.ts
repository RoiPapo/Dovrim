import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Subject } from '../subject.model';
import { Discussion } from '../discussion.model'

@Component({
    selector: 'app-newdiscussion',
    templateUrl: './newdiscussion.component.html',
    styleUrls: ['./newdiscussion.component.css']
})
export class NewdiscussionComponent implements OnInit {
    discussionName: string;
    inputs: Subject[] = [];
    myForm: FormGroup;
    constructor(private _fb: FormBuilder) { }

     ngOnInit() {
        this.myForm = this._fb.group({
            discussionName: ['', [Validators.required, Validators.minLength(3)]],
            subjects: this._fb.array([
                this.initSubject(),
            ])
        });
    }

     initSubject() {
        return this._fb.group({
            subjectName: ['', Validators.required],
            subjectTime: ['']
        });
    }

    addLink() {
        const control = <FormArray>this.myForm.controls['subjects'];
        control.push(this.initSubject());
    }

    removesubjects(i: number) {
        const control = <FormArray>this.myForm.controls['subjects'];
        control.removeAt(i);
    }
    save(model: FormGroup) {
        // call API to save
        // ...
        console.log(model.value);
    }

   

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
