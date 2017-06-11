import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Subject } from '../subject.model';
import { Discussion } from '../discussion.model'
import { RequestService } from '../requests.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-newdiscussion',
    templateUrl: './newdiscussion.component.html',
    styleUrls: ['./newdiscussion.component.css']
})
export class NewdiscussionComponent implements OnInit {


    discussionNow: Discussion;
    discussionName: string;
    inputs: Subject[] = [];
    myForm: FormGroup;
    editMode: boolean = false;


    constructor(private _fb: FormBuilder,
        private requestService: RequestService,
        private router: Router,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit() {

        // subscribe to router event


        this.activatedRoute.params.subscribe((params: Params) => {
            if (params.id) {
                console.log("edit");
            let discusisonId = params['id'];
            this.getTheDiscussionFromDb(discusisonId);
            }
        });

        this.myForm = this._fb.group({
            discussionName: ['', [Validators.required, Validators.minLength(3)]],
            subjects: this._fb.array([
                this.initSubject(),
            ])
        });
    }


    getTheDiscussionFromDb(id) {
        this.requestService.getSpesificDiscussion(id)
            .subscribe(
            discussion => {
                console.log(discussion);
                // this.discussionNow = discussion;
            },
            err => {
                console.log(err)
            })
    }

    logData() {
        console.log(this.discussionNow);
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
    // pass discussion over the service commented for legacy purposes
    // this.discussionPasserService.discussionPicked.subscribe(
    //   (selectedDiscussion: string) => {
    //   this.discussionNow = selectedDiscussion;
    //   console.log(this.discussionNow);
    //   });