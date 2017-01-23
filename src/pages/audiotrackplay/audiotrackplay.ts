import {
    Component,
    Input,
    Output,
    EventEmitter,

} from '@angular/core';
import { Http } from '@angular/http';
import {
   
    Platform
} from 'ionic-angular';
import {
    Music
} from '../../model/musicmodel';
import {
    WebAudioPlayer
} from '../../providers/audio-player-provider';
import {
    Sharedvalue
} from '../../providers/sharedvalue';


declare var cordova:any;


@Component({
    selector: 'audio-track-play',
    templateUrl: 'audiotrackplay.html'
})
export class Audiotrackplay {


    public selectedMusicFile: Music;
    public isPlaying;
    public isPaused;
    public isPlay;
    public connecting:boolean=false;
    @Output() MusicStatusChange: EventEmitter < any >= new EventEmitter();


    @Input() music: Music;

    constructor(public webAudioPlayer: WebAudioPlayer,public platform:Platform,public http:Http,public shared:Sharedvalue) {}

    ionViewDidLoad() {

    }

  


    playMusic(src) {
     
       var self=this;
         if(!this.webAudioPlayer.connecting&&!this.shared.sharedStatus)
         {
        this.webAudioPlayer.connecting=true;
        this.shared.sharedStatus=true;
        let pauseSrc1;       
             
            this.connecting=true;
            
            if (this.webAudioPlayer.pauseSrc !== undefined) {
            pauseSrc1 = this.webAudioPlayer.pauseSrc;               
        }
         
        if (this.isPaused == true && this.webAudioPlayer.isMusicPlaying == false && pauseSrc1 == src) {
  
            this.webAudioPlayer.play();
           this.isPlaying=this.checkPlaying();}          
        
        else {
           
             this.webAudioPlayer.stop();
            this.MusicStatusChange.emit(src);
            this.webAudioPlayer.src = src;
            this.webAudioPlayer.createAudio();
            this.webAudioPlayer.play();
            self.checkPlaying();
             
        }
      }
    }

    checkPlaying():any
    {   

 var self = this;      
                  
       if(self.webAudioPlayer.isMusicPlaying ==true&&self.webAudioPlayer.connecting==false&&self.connecting==true) {      
      self.music.isPlaying=true;
      self.connecting=false;
      this.shared.sharedStatus=false;
       return false;
     
    } 

   else if(self.webAudioPlayer.error==true&&self.connecting==true)
    {       
        
      self.connecting=false;
      self.music.isPlaying=false;
      self.webAudioPlayer.error=false;
      this.shared.sharedStatus=false;
      return false;    

    }
    else
    {
      setTimeout(function(){self.checkPlaying()},1)
    }
  
}


 ngDoCheck()
 {

     if( this.webAudioPlayer.isFinished)
     {
          this.music.isPlaying = false;
         
     }
 }

    


    pauseMusic() {

        this.webAudioPlayer.pause();
        this.music.isPlaying = false;
        this.isPaused = true;
         this.music.isPaused=true;

    }

    stopMusic() {
        this.webAudioPlayer.stop();
        this.music.isPlaying = false;
        this.isPaused = false;
        this.webAudioPlayer.connecting=false;

        }




    onSelect(music: Music) {
      /*Stop currently playing music*/


        this.platform.ready().then(() => {           
            
        this.selectedMusicFile = music;
        let src = this.selectedMusicFile.url;
    let filename=(src.split("/"))[src.split("/").length-1];
        // this.playMusic(src);
         let targetPath;
         

        if (this.platform.is('ios')) {
          targetPath = cordova.file.documentsDirectory+filename
        }
        else if(this.platform.is('android')) {
            console.log(cordova.file.externalRootDirectory);
            targetPath = cordova.file.externalRootDirectory+"Download/"+filename;         

        }
        else {
         targetPath=src;
        }
        
           
        
        this.http.get(targetPath).subscribe(
            res => {
               this.playMusic(targetPath);
        },
            err => {

              
                 this.playMusic(src);
            }
        );
         

    }
    )
}

};