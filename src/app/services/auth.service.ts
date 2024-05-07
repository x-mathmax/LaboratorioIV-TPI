import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
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
  usuariosLogs: AngularFirestoreCollection<any>;

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore,
    private fs: Firestore,

  ) {
    this.usuariosLogs = firestore.collection<any>('usuariosLogs');

    auth.authState.subscribe((user) => (this.logged = user));
  }


  async traerUsuariosLogsEstatica() {
    const col = collection(this.fs, 'usuariosLogs');
    return await getDocs(col);
  }

  traerUsuariosLogs() {
    return collectionData(collection(this.fs, 'usuariosLogs')) as Observable<
      any[]
    >;
  }

  salir() {
    this.userInfo = null;
    this.auth.signOut();
  }
}

