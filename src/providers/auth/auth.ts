//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*tambahan */
import firebase from 'firebase';
import { User } from '@firebase/auth-types';
/*----*/

@Injectable()
export class AuthProvider {
  // dimatikan karena port yang digunakan bukan 80 / 8080
  /*constructor(public http: HttpClient) {
    console.log('Hello AuthProvider Provider');
  }*/

  // signup user
  signupUser(email: string, password: string): Promise<void> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(newUser => { //resolve atau hasil
        // mengaktifkan user dengan email yang dimasukkan
        firebase
          .database()
          .ref(`userProfile/${newUser.uid}/email`)
          .set(email);
      })
      .catch(error => {
        console.log("Terjadi ERROR : ", error);
        throw new Error(error);
      });
  }

  // login user
  loginUser(email : string, password: string): Promise<void> {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email,password);
  }

  // logout user
  logoutUser():Promise<void> {
    // untuk mendapatkan uid
    const userId: string = firebase.auth().currentUser.uid;

    // menonaktifkan dari user
    firebase.database()
      .ref(`/userProfile/${userId}`)
      .off();

    return firebase.auth().signOut();
  }

  // untuk mengatasi yang lupa password
  resetPassword(email: string) : Promise<void> {
    return firebase
      .auth()
      .sendPasswordResetEmail(email);
  }

}
