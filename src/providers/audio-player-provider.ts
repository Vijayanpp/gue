import {
    Injectable
} from '@angular/core';
import {
    AudioPlayerModel
} from '../model/AudioModel';
import {
    Toast
} from 'ionic-native';




@Injectable()
export class WebAudioPlayer implements AudioPlayerModel {
    private audio: HTMLAudioElement;
    public src: string;
    public preload;
    public completed: number = 0;
    public isMusicPlaying: boolean = false;
    public isFinished: boolean = false;
    public progress: number = 0;
    public duration: number;
    public id: number;
    public isLoading: boolean;
    public isPaused: boolean;
    public hasLoaded: boolean;
    public showDuration: boolean;
    public pauseSrc: string;
    public connecting: boolean;
    public error: boolean;

    constructor() {
        this.createAudio();
    }
    public createAudio() {
        this.audio = new Audio();
        this.audio.src = this.src ? this.src : 'sleep-away.mp3'
        this.audio.preload = this.preload;

        this.audio.addEventListener("timeupdate", (e) => {
            this.onTimeUpdate(e);
        }, false);

        this.audio.addEventListener("error", (err) => {
            console.log(`Audio error => track ${this.src}`, err);

            this.isMusicPlaying = false;
            this.connecting = false;
            this.error = true;
            this.showDuration = false;
            if (this.connecting == false) {
                Toast.show("Can't play this file", '5000', 'center').subscribe(
                    toast => {

                    }
                );
            }


        }, false);

        this.audio.addEventListener("canplay", () => {
            //console.log(`Loaded track ${this.src}`);
            this.isLoading = false;
            this.hasLoaded = true;
            this.showDuration = true;
            this.error = false;

        }, false);

        this.audio.addEventListener("playing", () => {
            //console.log(`Playing track ${this.src}`);
            this.isFinished = false;
            this.isPaused = false;
            this.connecting = false;
            this.isMusicPlaying = true;
            this.error = false;
            this.pauseSrc = "";
        }, false);

        this.audio.addEventListener("pause", () => {
            this.isMusicPlaying = false;
            this.isPaused = true;
            this.isFinished = false;
            this.pauseSrc = this.audio.src;
            this.error = false;
            this.progress = this.audio.currentTime;
            //console.log('Paused playback');
        }, false);

        this.audio.addEventListener("ended", () => {
            this.isMusicPlaying = false;
            this.isFinished = true;
            this.progress = 0;
            //console.log('Finished playback');
        }, false);



        this.audio.addEventListener("durationchange", (e: any) => {
            this.duration = e.target.duration;
        }, false);


    }
    private onTimeUpdate(e: Event) {
        if (this.isMusicPlaying && this.audio.currentTime > 0) {
            this.progress = this.audio.currentTime;
            this.completed = this.audio.duration > 0 ? Math.trunc(this.audio.currentTime / this.audio.duration * 100) / 100 : 0;
        }
    }

    play() {



        if (!this.audio) {
            this.createAudio();
        }

        if (!this.hasLoaded) {
            console.log(`Loading track ${this.src}`);
            this.error = false;
            this.isLoading = true;
            this.connecting = true;
        }


        this.audio.play();

    }

    pause() {
        if (!this.isMusicPlaying) return;
        this.audio.pause();
        this.isPaused = true;
    }

    stop() {
        if (!this.audio) return;
        this.pause();
        this.audio.removeEventListener("timeupdate", (e) => {
            this.onTimeUpdate(e);
        });
        this.isFinished = true;
        this.progress = 0;
        this.destroy();
    }



    seekTo(time: number) {
        this.audio.currentTime = time;
    }


    destroy() {
        this.audio = undefined;
        //console.log(`Released track ${this.src}`);
    }


}