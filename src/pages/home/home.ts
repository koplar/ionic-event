import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  // membuka profile
  goToProfile() : void {
    this.navCtrl.push('ProfilePage');
  }

  // membuka halaman event create
  goToCreateEvent() : void {
    this.navCtrl.push('EventCreatePage');
  }

  // membuka halaman list event
  goToListEvent() : void {
    this.navCtrl.push('EventListPage');
  }

}
