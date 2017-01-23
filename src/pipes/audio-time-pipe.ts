import {
    Pipe
} from '@angular/core';

/*
  Generated class for the AudioTimePipe pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
    name: 'audiotimepipe'
})


export class AudioTimePipe {

    transform(value ? : number): string {
        if (value === undefined || Number.isNaN(value)) return '';
        let s = Math.trunc(value % 60);
        let m = Math.trunc((value / 60) % 60);
        let h = Math.trunc(((value / 60) / 60) % 60);
        return h > 0 ? `${h<10?'0'+h:h}:${m<10?'0'+m:m}:${s<10?'0'+s:s}` : `${m<10?'0'+m:m}:${s<10?'0'+s:s}`;
    }
}