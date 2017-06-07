import { Subject } from './subject.model';

export class Discussion {
    _id: string;
    name: string;
    subject: Subject[];

    constructor(name: string, subject: Subject[]) {
        this._id = null;
        this.name = name;
        this.subject = subject;
    }


}