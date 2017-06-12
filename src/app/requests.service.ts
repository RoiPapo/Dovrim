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
    private discussionsUrl = 'http://localhost:3000/api/all';
    private discussionById = 'http://localhost:3000/api/status';

    getDiscussions(): Observable<Discussion[]> {
        return this.http.get(this.discussionsUrl)//use options later for "per user get"
            .map((res: Response) => res.json()) // parse the responce to javascript object
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
    }

    getSpesificDiscussion(id: string): Observable<Discussion> {
        return this.http.get(this.discussionById + '/' + id)//use options later for "per user get"
            .map((res: Response) => res.json()) // parse the responce to javascript object
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
    }

    // postDiscussion(datafordb):Observable<string> {
    //     var xhr = new XMLHttpRequest();
    //     xhr.open('POST', 'http://localhost:3000/api/status');   //server name patch papo
    //     xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    //     xhr.send(JSON.stringify(datafordb));
    //     return Observable.of("done");

    // }

    postDiscussion(datafordb: object): Observable<string> {
        let bodyString = JSON.stringify(datafordb); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option
        
        return this.http.post('http://localhost:3000/api/status', datafordb, options) // ...using post request
            .map((res: Response) =>  res.text()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error || 'Server error')); //...errors if any
    }

    deleteDiscussion(id: string): Observable<string> {
        return this.http.delete(`${this.discussionById}/${id}`) // ...using Delete request
            .map((res: Response) => res.text()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error || 'Server error')); //...errors if any
    }

}