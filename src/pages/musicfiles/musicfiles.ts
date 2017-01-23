import {
    Component,
    ViewChild,
    Output,
    EventEmitter
} from '@angular/core';
import {
    NavController,
    ModalController,
    PopoverController
} from 'ionic-angular';
import {
    Music
} from '../../model/musicmodel';
import {
    FetchMusicFiles
} from '../../providers/fetch-music-files';
import {
    WebAudioPlayer
} from '../../providers/audio-player-provider';
import {
    Audiotrackplay
} from '../audiotrackplay/audiotrackplay';
import {
    Audioplayer
} from '../audioplayer/audioplayer';
// import {SpinnerComponent } from '../myspinner/myspinner';
import {
    About
} from '../about/about';
import {
    Donation
} from '../donation/donation'



declare var cordova: any;

@Component({
    selector: 'page-musicfiles',
    templateUrl: 'musicfiles.html'
})


export class Musicfiles {

    @ViewChild(Audiotrackplay) audiotrackplay: Audiotrackplay;
    @ViewChild(Audioplayer) audioplayer: Audioplayer;


    public musics: Music[];
    public selectedMusicFile: Music;
    public musicStarted: boolean = false;
    public isRequesting: boolean = true;
  
    aboutPage = About;
    @Output() MusicStatusChanged: EventEmitter < any >= new EventEmitter();
    constructor(public navCtrl: NavController, public fetchMusicFiles: FetchMusicFiles, public webAudioPlayer: WebAudioPlayer, public modalCtrl: ModalController, public popoverCtrl: PopoverController) {
        this.isRequesting = true;
    }



    openpage() {
        this.navCtrl.push(About);
    }

    showModal() {
        const modal = this.modalCtrl.create(Donation);
        modal.present();
    }
    showPopover() {
        const popover = this.popoverCtrl.create(Donation);
        popover.present(popover);

    }
     openUrl() {
        window.open("http://www.guetnacht.ch/index.php?id=2", "_parent");
    }

    ionViewDidLoad() {

        this.fetchMusicFileAndShowData();
    }


    fetchMusicFileAndShowData() {

        /*this.musics=MUSIC;*/
        this.fetchMusicFiles.load().subscribe(musics => {
            this.musics = musics;
           
            for (var i = this.musics.length - 1; i >= 0; i--) {
                this.musics[i].isPaused = false;
            }
            var self=this;
            setTimeout(function(){self.isRequesting = false;},2000)
        })
    }

    startNewPlayer(src) {

        this.audioplayer.range = 0;
        for (var i = this.musics.length - 1; i >= 0; i--) {
            this.musics[i].isPlaying = false;
            this.musics[i].isPaused = false;
        }



    }
    ngDoCheck() {
        if (this.webAudioPlayer.isFinished) {
            this.audioplayer.range = 0;
        }
    }


    stopAllmusic() {
        this.webAudioPlayer.stop();
        this.navCtrl.pop();
    }


}