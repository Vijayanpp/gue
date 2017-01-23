import {
    Component,
    Input,
    NgZone
} from '@angular/core';
import {
    Transfer
} from 'ionic-native';
import {
    Platform,
    NavController,
    AlertController
} from 'ionic-angular';
import {
    Music
} from '../../model/musicmodel';
import {
    Http
} from '@angular/http';
import {
    Toast
} from 'ionic-native';
declare var cordova: any;
/*
  Generated class for the Download page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'audio-download',
    templateUrl: 'download.html'
})
export class Download {
    public isDownloading: boolean;
    public downloaded = 0;


    @Input() music: Music;
    constructor(public navCtrl: NavController, public alertCtrl: AlertController, public platform: Platform, public zone: NgZone, public http: Http) {}


    ionViewDidLoad() {
        //console.log('Hello Download Page');

    }


    downloadMusic(music) {
        this.isDownloading = true;
        this.platform.ready().then(() => {
            let fileTransfer = new Transfer();
            let targetPath;
            let options: any;
            let filename = (music.split("/"))[music.split("/").length - 1];

            
            options = {
                fileKey: 'file',
                fileName: music,
                mimeType: "audio/mpeg"

            }

            if (!this.platform.is('cordova')) {
                return false;
            }

            if (this.platform.is('ios')) {
                targetPath = cordova.file.documentsDirectory
            } else if (this.platform.is('android')) {
                
                targetPath = cordova.file.externalRootDirectory + "Download";


            } else {
                return false;
            }
            let self = this;
            fileTransfer.onProgress(function(progress: ProgressEvent): void {
                // constant progress updates
                self.zone.run(() => {
                    this.isDownloading = true;
                    self.downloaded = parseInt((progress.loaded * 100 / progress.total).toFixed());
                    // console.log('Downloading: '+(progress.loaded*100/progress.total).toFixed()+'%');
                })
            })

            this.http.get(targetPath + "/" + filename).subscribe(
                res => {
                    Toast.show(`${filename} was  already downloaded`, '2000', 'center').subscribe(
                        toast => {
                            
                        });
                    this.isDownloading = false;
                }, err => {

                    fileTransfer.download(encodeURI(music), targetPath + "/" + filename, true).then((theFile) => {
                       

                        Toast.show(`${filename} was successfully downloaded to: ${theFile.toURL()}`, '2000', 'center').subscribe(
                            toast => {
                               
                            }
                        );


                        this.isDownloading = false;
                        this.downloaded = 0;


                    }).catch(e => {


                        Toast.show(`Please check the connection`, '2000', 'center').subscribe(
                            toast => {
                                //console.log(toast);
                            }
                        );
                        this.isDownloading = false;
                        this.downloaded = 0;

                    });
                })

        });
    }



}