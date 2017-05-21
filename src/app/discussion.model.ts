import { Subject } from './subject.model';

export class Discussion {
    name: string;
    subject:Subject[];
    
    constructor(name: string, subject: Subject[]) {
        this.name = name;
        this.subject = subject;
    }


}