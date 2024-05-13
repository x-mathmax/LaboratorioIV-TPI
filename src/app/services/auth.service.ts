import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  getDocs,
  collection,
  collectionData,
  Firestore,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  userInfo: any = '';
  logged: any = false;

  constructor(


  ) {
   
  }

  // salir() {
  //   this.userInfo = null;
  //   this.auth.signOut();
  // }
}

