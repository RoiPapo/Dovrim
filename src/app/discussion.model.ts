import { Subject } from './subject.model';

export class Discussion {
    _id: string;
    discussionName: string;
    subject: Subject[];

    constructor(discussionName: string, subject: Subject[]) {
        this._id = null;
        this.discussionName = discussionName;
        this.subject = subject;
    }


}