import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**Tambahan */
import { EventProvider } from '../../providers/event/event';
import { Alert, AlertController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
/**-- */

// untuk menerima paramater yang dikirim oleh halaman lain
@IonicPage({
  segment : 'event-detail/:eventId'
})

@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {
  public currentEvent : any = {}; // array [] / {}
  public guestName : string = '';
  public guestPicture : string = null;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public eventProvider : EventProvider,
    public alertCtrl: AlertController,
    public cameraPlugin : Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetailPage');

    // baca dari firebase
    this.eventProvider
      .getEventDetail(this.navParams.get('eventId'))
      .on('value', eventSnapshot => {
        this.currentEvent = eventSnapshot.val();
        this.currentEvent.id = eventSnapshot.key;
      });
  }

  //update data event
  updateEvent(): void {
    const alert: Alert = this.alertCtrl.create({
      message: 'Perubahan data Event!',
      inputs: [
        {
          name: 'eventId',
          placeholder: 'Isikan id event',
          value: this.currentEvent.id
        },
        {
          name: 'eventName',
          placeholder: 'Isikan nama event',
          value: this.currentEvent.name
        },
        {
          name: 'eventPrice',
          placeholder: 'Isikan harga',
          value: this.currentEvent.price
        },
        {
          name: 'eventDate',
          placeholder: 'Isikan tanggal',
          value: this.currentEvent.date
        },
        {
          name: 'eventContact',
          placeholder: 'Isikan contact',
          value: this.currentEvent.contact
        },
        {
          name: 'eventDes',
          placeholder: 'Isikan keterangan',
          value: this.currentEvent.des
        },
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.eventProvider
              .updateEvent(this.currentEvent.id, data.name, data.date, data.price, data.contact, data.des);
          }
        }
      ]
    });
    alert.present();
  }

  // mengambil gambar / capture atau gallery
  takePicture() : void{
    this.cameraPlugin
      .getPicture({
        quality : 95,
        destinationType:this.cameraPlugin.DestinationType.DATA_URL,
        sourceType : this.cameraPlugin.PictureSourceType.CAMERA,
        allowEdit : true,
        encodingType : this.cameraPlugin.EncodingType.PNG,
        targetWidth : 500,
        targetHeight : 500,
        saveToPhotoAlbum : true
      })
      .then(imageData => {
        this.guestPicture = imageData;
      },
      error => {
        console.log('Error : ' + JSON.stringify(error));
      }
    );
  }

  // menyimpan data peserta
  addGuest(guestName : String) : void {
    this.eventProvider
      .addGuest(
        this.currentEvent.id,
        this.guestName,
        this.guestPicture
      )
      .then(newGuest => {
        this.guestName = '';
        this.guestPicture = null;
      })
  }

}
