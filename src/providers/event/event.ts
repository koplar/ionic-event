//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*tambahan */
import firebase from 'firebase';
import { Reference, ThenableReference } from '@firebase/database-types';
/*----*/

@Injectable()
export class EventProvider {
  public eventListRef : Reference;
  public eventListRefDetail : Reference;

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

  // proses update event
  updateEvent(
    eventId: string, eventName : string, eventDate : string,
    eventPrice : number, eventContact : string,
    eventDes : string
  ) : ThenableReference {
    this.eventListRefDetail = firebase.database().ref(`/eventList/${eventId}`);
    return this.eventListRefDetail.push({
      name : eventName,
      date : eventDate,
      price : eventPrice * 1, // yang bertipe number harus diikuti * 1
      contact : eventContact,
      des : eventDes
    });
  }

  /*updateEvent(eventId: string, name: string, date: string, 
    price : number, contact : string,
    des : string): Promise<any> {
      this.eventListRefDetail = firebase.database().ref(`/eventList/${eventId}`);
      //return this.eventListRefDetail.update({ name,date,price,contact,des });
      return this.eventListRefDetail.update({ name,date,price,contact,des });  
  }*/

  // menambah peserta event
  addGuest(
    eventId : string,
    guestName : string,
    guestPicture : string = null
  ) : PromiseLike<any> {
    return this.eventListRef
      .child(`${eventId}/guestList`)
      .push({ guestName })
      .then( newGuest => {
        this.eventListRef.child(eventId)
          .transaction(event => {
            return event;
          });

          // cek guestPicture kosong atau tidak
          if(guestPicture != null){ // kalo ada simpan di storage
            firebase.storage()
              .ref(`/guestProfile/${newGuest.key}/profilePicture.png`)
              .putString(guestPicture, 'base64', {
                contentType:'image/png'
              })
              .then(savedPicture => { // simpan data di database firebase di anak dari event yang dipilih
                this.eventListRef
                  .child(`${eventId}/guestList/${newGuest.key}/profilePicture`)
                  .set(savedPicture.downloadURL);
              })
          }
      });
  }

}
