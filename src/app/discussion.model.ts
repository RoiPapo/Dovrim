import { Subject } from './subject.model';

export class Discussion {
    name: string;
    subjects:Subject[];
    
    constructor(name: string, subjects: Subject[]) {
        this.name = name;
        this.subjects = subjects;
    }


}