import {
    Component,
    Input
} from '@angular/core';
import {
    WebAudioPlayer
} from '../../providers/audio-player-provider';
import {
    ElementRef,
    Renderer
} from '@angular/core';


@Component({
    selector: 'audioplayer',
    templateUrl: 'audioplayer.html',

})


export class Audioplayer {


    public completed: number;
    public range: number;
    public showDuration: boolean;
    public showProgress: boolean;



    constructor(public el: ElementRef, private renderer: Renderer, public webAudioPlayer: WebAudioPlayer) {}

    ionViewDidLoad() {

    }



    @Input()
    public set progress(v: boolean) {
        this.showProgress = true;
    }

    @Input()
    public set duration(v: boolean) {
        this.showDuration = true;
    }


    ngOnInit() {
        this.renderer.setElementStyle(this.el.nativeElement, 'width', '100%');

    }

    ngDoCheck() {
        this.showProgress = true;
        this.showDuration = this.webAudioPlayer.showDuration;
        if (this.webAudioPlayer.completed >= 0 && !Object.is(this.webAudioPlayer.completed, this.completed)) {
            this.completed = this.webAudioPlayer.completed;
            var value=Math.round(this.completed * 100 * 100) / 100;
            this.range =value;
            
        }

    }

    seekTo() {
        let seekTo: number = Math.round(this.webAudioPlayer.duration * this.range) / 100;
        if (!Number.isNaN(seekTo)) this.webAudioPlayer.seekTo(seekTo);
    }



}