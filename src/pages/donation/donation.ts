import {
    Component
} from '@angular/core';
import {
    NavController,
    ViewController
} from 'ionic-angular';

/*
  Generated class for the Donation page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-donation',
    templateUrl: 'donation.html'
})
export class Donation {

    constructor(public navCtrl: NavController, private viewCtrl: ViewController) {}

    ionViewDidLoad() {
        
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
   openUrl() {
        window.open("http://www.guetnacht.ch/index.php?id=2", "_parent");
    }

}