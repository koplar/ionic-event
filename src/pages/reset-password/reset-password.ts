import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/* tambahan */
// untuk validator
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
// untuk alert
import { Alert, AlertController} from 'ionic-angular';
// untuk tanda loading
import { Loading, LoadingController} from 'ionic-angular';
// untuk koneksi ke firebase
import firebase  from 'firebase';
// untuk memanggil perintah provide
import { AuthProvider } from '../../providers/auth/auth';
// untuk mengambil halaman home
import { LoginPage } from '../login/login';
/*--- */

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
  // buat public variabel dan tambahkan variable formBuilder di construktor
  public resetForm : FormGroup;
  public loading : Loading;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public formBuilder: FormBuilder,
    public loadingCtrl : LoadingController,
    public alertCtrl : AlertController,
    public authProvider : AuthProvider) {
      //validasi
      this.resetForm = formBuilder.group(
        {
          email : ['', Validators.compose([Validators.required])],
        }
      );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

  resetPassword() {
    if(!this.resetForm.valid) { // jika inputan belum valid
      console.log(`Input Form Tidak Valid : ${this.resetForm.value}`);
    } else {
      // baca formcontrolName dahulu untuk disimpan divariabel
      const email = this.resetForm.value.email;
      // cek apakah ada di firebase
      this.authProvider.resetPassword(email).then(
        // promise
        userData => {
          // mematikan tanda loading
          this.loading.dismiss().then(() => {
              const alert:Alert = this.alertCtrl.create({
                message : 'Cek Email untuk reset password anda',
                buttons : [{
                  text : 'OK',
                  role : 'cancel'
                }]
              });
              alert.present();
              // berhasil reset password
              this.navCtrl.setRoot(LoginPage)
          });
        },
        error => {
          // reject
          this.loading.dismiss().then(() => {
            // gagal reset password menampilkan pesan
            const alert:Alert = this.alertCtrl.create({
              message : error.message,
              buttons : [{
                text : 'OK',
                role : 'cancel'
              }]
            });
            alert.present();
          });
        }
      );
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

}
