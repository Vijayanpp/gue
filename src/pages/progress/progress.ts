import { Component,Input} from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Progress page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'download-progress',
  templateUrl: 'progress.html'
})
export class Progress {
	
	@Input() classValue:number;

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello Progress Page');
  }

}
