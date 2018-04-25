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
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  // buat public variabel dan tambahkan variable formBuilder di construktor
  public signupForm : FormGroup;
  public loading : Loading;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public formBuilder: FormBuilder,
    public loadingCtrl : LoadingController,
    public alertCtrl : AlertController,
    public authProvider : AuthProvider) {
      //validasi
      this.signupForm = formBuilder.group(
        {
          email : ['', Validators.compose([Validators.required])],
          password : ['', Validators.compose([Validators.required,Validators.minLength(8)])]
        }
      );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  //proses signup user baru
  signupUser() : void {
    // cek validasi form
    if(!this.signupForm.valid){
      console.log(`Input Form Tidak Valid : ${this.signupForm.value}`);
    } else {
      // baca formcontrolName dahulu untuk disimpan divariabel
      const email = this.signupForm.value.email;
      const password = this.signupForm.value.password;

      // cek apakah ada di firebase
      this.authProvider.signupUser(email,password).then(
        // promise
        authData => {
          // mematikan tanda loading
          this.loading.dismiss().then(() => {
              // berhasil signup
              this.navCtrl.setRoot(HomePage)
          });
        },
        error => {
          // reject
          this.loading.dismiss().then(() => {
            // gagal signup menampilkan pesan
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
