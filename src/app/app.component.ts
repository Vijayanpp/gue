import {
    Component,
    ViewChild
} from '@angular/core';
import {
    Platform,
    MenuController,
    Nav
} from 'ionic-angular';
import {
    StatusBar
} from 'ionic-native';
import {
    Homepage
} from '../pages/homepage/homepage';
import {
    Musicfiles
} from '../pages/musicfiles/musicfiles';


@Component({
    templateUrl: 'app.html'
})
export class MyApp {

    @ViewChild(Nav) nav: Nav;

    // make Musicfiles the root (or first) page
    rootPage: any = Homepage;
    pages: Array < {
        title: string,
        component: any
    } > ;
    public muusicfiles;

    constructor(
        public platform: Platform,
        public menu: MenuController
    ) {
        this.initializeApp();

        // set our app's pages
        this.pages = [{
                title: 'Home Page',
                component: Musicfiles
            },
            {
                title: 'Music Page',
                component: Musicfiles
            }

        ];
        this.muusicfiles = Musicfiles;
    }

    ionViewDidEnter() {

        this.menu.swipeEnable(false, 'menu1');
    }

    initializeApp() {

        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            this.menu.swipeEnable(false, 'menu1');


        });
    }

    openPage(page) {

        this.nav.push(page)
    }


}