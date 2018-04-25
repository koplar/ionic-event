import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/** tambahan */
import { EventProvider } from '../../providers/event/event';
/**--- */

/**
 * Generated class for the EventCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-create',
  templateUrl: 'event-create.html',
})
export class EventCreatePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public eventProvider : EventProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventCreatePage');
  }

  // buat kegiatan baru
  createEvent(
    eventname : string,eventDate : string,eventPrice : number,
    eventKontak : string,eventDes : string
  ):void{
    this.eventProvider
      .createEvent(eventname,eventDate,eventPrice,eventKontak,eventDes)
      .then(newEvent => {
        this.navCtrl.pop();
      })
  }

}
