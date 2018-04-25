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
import { HomePage } from '../home/home';
/*--- */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  // buat public variabel dan tambahkan variable formBuilder di construktor
  public loginForm : FormGroup;
  public loading : Loading;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public formBuilder: FormBuilder,
    public loadingCtrl : LoadingController,
    public alertCtrl : AlertController,
    public authProvider : AuthProvider) {
      //validasi
      this.loginForm = formBuilder.group(
        {
          email : ['', Validators.compose([Validators.required])],
          password : ['', Validators.compose([Validators.required,Validators.minLength(8)])]
        }
      );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  // proses login users
  loginUser(){
    // cek apakah email dan password sdh valid
    if(!this.loginForm.valid) { // jika inputan belum valid
      console.log(`Input Form Tidak Valid : ${this.loginForm.value}`);
    } else {
      // baca formcontrolName dahulu untuk disimpan divariabel
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      // cek apakah ada di firebase
      this.authProvider.loginUser(email,password).then(
        // promise
        authData => {
          // mematikan tanda loading
          this.loading.dismiss().then(() => {
              // berhasil login
              this.navCtrl.setRoot(HomePage)
          });
        },
        error => {
          // reject
          this.loading.dismiss().then(() => {
            // gagal login menampilkan pesan
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

  // membuka halaman signup
  goToSignup():void {
    this.navCtrl.push('SignupPage');
  }

  // membuka halaman untuk reset password
  goToResetPassword() : void {
    this.navCtrl.push('ResetPasswordPage');
  }

  presentAlert(pesan : string) {
    let alert = this.alertCtrl.create({
      title: 'Pesan',
      subTitle: pesan,
      buttons: ['Dismiss']
    });
    alert.present();
  }
}
