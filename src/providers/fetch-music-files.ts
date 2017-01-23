import {
    Injectable
} from '@angular/core';
import {
    Http
} from '@angular/http';
import {
    Observable
} from 'rxjs/Rx';;
import 'rxjs/add/operator/map';
import {
    Music
} from '../model/musicmodel';

/*
  Generated class for the FetchMusicFiles provider.  
*/
@Injectable()
export class FetchMusicFiles {
    musicApiUrl = 'music.json';
    constructor(public http: Http) {}

    load(): Observable < Music[] > {
        return this.http.get(`${this.musicApiUrl}`)
            .map(res => < Music[] > res.json());
    }

}