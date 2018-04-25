import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/** Tambahan */
import { EventProvider } from '../../providers/event/event';
/** -- */

@IonicPage()
@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html',
})
export class EventListPage {
  public eventList : Array<any>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public eventProvider : EventProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventListPage');

    // baca  eventList dari firebase
    this.eventProvider.getEventList()
      .on('value', eventListSnapshoot => {
        this.eventList = []; // array
        eventListSnapshoot.forEach(snap => {
          this.eventList.push({
            id : snap.key,  // menambahkan id di data untuk membedakan
            name : snap.val().name,
            date : snap.val().date,
            price : snap.val().price,
            contact : snap.val().contact,
            ket : snap.val().ket
          });
          return false;
        });
      });
  }

  goToDetail(eventId):void {
    this.navCtrl.push('EventDetailPage',{ eventId: eventId});
  }

}
