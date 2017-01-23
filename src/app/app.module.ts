import {
    NgModule
} from '@angular/core';
import {
    IonicApp,
    IonicModule
} from 'ionic-angular';
import {
    MyApp
} from './app.component';
import {
    Musicfiles
} from '../pages/musicfiles/musicfiles';
import {
    Homepage
} from '../pages/homepage/homepage';
import {
    Audioplayer
} from '../pages/audioplayer/audioplayer';
import {
    Audiotrackplay
} from '../pages/audiotrackplay/audiotrackplay';

import {
    FetchMusicFiles
} from '../providers/fetch-music-files';
import {
    WebAudioPlayer
} from '../providers/audio-player-provider';
import {
    Sharedvalue
} from '../providers/sharedvalue';


import {
    AudioTimePipe
} from '../pipes/audio-time-pipe';
import {
    SpinnerComponent
} from '../pages/myspinner/myspinner';
import {
    About
} from '../pages/about/about';
import {
    Loading
} from '../pages/loading/loading';
import {
    Progress
} from '../pages/progress/progress';
import {
    Download
} from '../pages/download/download';
import {
    Donation
} from '../pages/donation/donation'


@NgModule({
    declarations: [
        MyApp,
        Homepage,
        Musicfiles,
        Audioplayer,
        Audiotrackplay,
        AudioTimePipe,
        SpinnerComponent,
        About,
        Loading,
        Progress,
        Download,
        Donation


    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        Homepage,
        Musicfiles,
        About,
        Donation
    ],
    providers: [FetchMusicFiles, WebAudioPlayer, Sharedvalue]
})
export class AppModule {}