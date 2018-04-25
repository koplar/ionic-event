import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import tambahan untuk firebase
import firebase, { Unsubscribe } from 'firebase';
import { firebaseConfig } from './config';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
      // untuk membaca API firebase untuk pertama kali 
      firebase.initializeApp(firebaseConfig);

      // cek user sedang login atau belum
      const unsubcribe: Unsubscribe = 
        firebase.auth()
          .onAuthStateChanged(user => {
            //statement
            if(!user) {
              this.rootPage = 'LoginPage';
              unsubcribe();
            } else {
              this.rootPage = HomePage;
              unsubcribe();
            }
          }
          );


      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

