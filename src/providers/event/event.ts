//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*tambahan */
import firebase from 'firebase';
import { Reference, ThenableReference } from '@firebase/database-types';
/*----*/

@Injectable()
export class EventProvider {
  public eventListRef : Reference;

  constructor() {
    console.log('Hello EventProvider Provider');

    // baca dari database farebase
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        //this.eventListRef = firebase.database().ref(`/userProfile/${user.uid}/eventList`);
        this.eventListRef = firebase.database().ref(`/eventList`);
      }
    });
  }

  // melihat semua data di eventList
  getEventList() : Reference {
    return this.eventListRef;
  }

  // melihat detail dari event yang dipilih
  getEventDetail(eventId : string): Reference {
    return this.eventListRef.child(eventId);
  }

  // membuat event baru
  createEvent(
    eventName : string, eventDate : string,
    eventPrice : number, eventContact : string,
    eventDes : string
  ) : ThenableReference {
    return this.eventListRef.push({
      name : eventName,
      date : eventDate,
      price : eventPrice * 1, // yang bertipe number harus diikuti * 1
      contact : eventContact,
      des : eventDes
    });
  }


}
