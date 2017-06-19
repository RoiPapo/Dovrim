export class Subject {
    subjectName: string;
    subjectTime: number;
    subjectSpeaker: string;

    constructor(name: string, time: number, speaker:string) {
        this.subjectName = name;
        this.subjectTime = time;
        this.subjectSpeaker = speaker;
    }


}