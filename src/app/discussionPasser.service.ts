import {Injectable, EventEmitter} from '@angular/core';
import {Discussion} from './discussion.model';
import {Subject} from './subject.model';
@Injectable()
export class DiscussionPasserService {
    discussionPicked= new EventEmitter<string>();

}