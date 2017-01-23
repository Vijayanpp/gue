import {
    Component
} from '@angular/core';
import {
    NavController
} from 'ionic-angular';
import {
    WebAudioPlayer
} from '../../providers/audio-player-provider';
import {
    Musicfiles
} from '../musicfiles/musicfiles'


@Component({
    selector: 'page-homepage',
    templateUrl: 'homepage.html'
})
export class Homepage {

    constructor(public navCtrl: NavController, public webAudioPlayer: WebAudioPlayer) {}

    ionViewDidLoad() {}

    /*we push a page into the navigation stack. Going back or pressing the back button is like popping the last element in the stack (Last In First Out).*/

    openPage() {


        this.navCtrl.push(Musicfiles);
        if (this.webAudioPlayer.isMusicPlaying == true) {
            this.webAudioPlayer.stop();
            this.webAudioPlayer.isMusicPlaying = false;
        }
    }

}