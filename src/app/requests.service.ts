// Imports
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Discussion } from './discussion.model';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RequestService {
    // Resolve HTTP using the constructor
    constructor(private http: Http) { }
    // private instance variable to hold base url
    private discussionsUrl = 'http://localhost:3000/api/statuss/cat';
    
    getDiscussions(): Observable<Discussion[]>{
        return this.http.get(this.discussionsUrl)//use options later for "per user get"
        .map((res:Response)=> res.json()) // parse the responce to javascript object
        .catch((error:any)=>Observable.throw(error.json().error || 'Server error'))
    }


}