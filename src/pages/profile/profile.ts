import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/* tambahan */
import { ProfileProvider } from '../../providers/profile/profile';
import { AuthProvider } from '../../providers/auth/auth';
import { Alert, AlertController } from 'ionic-angular';
/*--- */

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public userProfile: any;
  //public userProfileSnapshot: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    public profileProvider: ProfileProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');

    // cek userprofile dari firebase database dan simpan hasil pembacaan di userProfile
    this.profileProvider.getUserProfile()
      .on('value', userProfileSnapshot => {
        this.userProfile = userProfileSnapshot.val();
      });

  }

  // proses logout
  goToLogout(): void {
    this.authProvider.logoutUser().then(() => {
      this.navCtrl.setRoot('LoginPage');
    })
  }

  //update nama
  updateNama(): void {
    const alert: Alert = this.alertCtrl.create({
      message: 'Isikan nama lengkap anda!',
      inputs: [
        {
          name: 'firstname',
          placeholder: 'Isikan nama depan',
          value: this.userProfile.firstname
        },
        {
          name: 'lastname',
          placeholder: 'Isikan nama belakang',
          value: this.userProfile.lastname
        },
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileProvider
              .updateNama(data.firstname, data.lastname);
          }
        }
      ]
    });
    alert.present();
  }

  updateHp(): void {
    const alert: Alert = this.alertCtrl.create({
      message: 'Isikan mobile phone anda!',
      inputs: [
        {
          name: 'hp',
          placeholder: 'Isikan mobile phone',
          value: this.userProfile.hp
        }
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileProvider
              .updateHp(data.hp);
          }
        }
      ]
    });
    alert.present();
  }
}
