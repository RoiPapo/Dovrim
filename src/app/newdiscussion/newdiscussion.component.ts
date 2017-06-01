import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Subject } from '../subject.model';
import { Discussion } from '../discussion.model'
import { RequestService } from '../requests.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-newdiscussion',
    templateUrl: './newdiscussion.component.html',
    styleUrls: ['./newdiscussion.component.css']
})
export class NewdiscussionComponent implements OnInit {
    @Input("selectedDiscussion") discussionNow: Discussion;
    @Input("editFlag") editFlag: boolean;

    discussionName: string;
    inputs: Subject[] = [];
    myForm: FormGroup;
    editMode: boolean = false;


    constructor(private _fb: FormBuilder, private requestService: RequestService,private router:Router) { }

    ngOnInit() {
        if(this.editFlag==true){this.editMode=true;}
        console.log(this.editFlag);
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
        var datafordb = {
            discussionName: model.value.discussionName,
            subject: model.value.subjects
        }
        this.requestService.postDiscussion(datafordb);
        this.router.navigate(['/discussions']);
    }




}
