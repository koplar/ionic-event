import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**Tambahan */
import { EventProvider } from '../../providers/event/event';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public eventProvider : EventProvider) {
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

}
