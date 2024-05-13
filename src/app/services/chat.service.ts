import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { addDoc, collection, collectionData, Firestore, query, orderBy, limit, where, getDocs, CollectionReference  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Usuario } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private firestore: Firestore, public afAuth: Auth) {}

  async agregarMensaje(emisor: string, mensaje:string){
    try{
      let c = collection(this.firestore, 'chats');
      addDoc(c, { emisor: emisor, mensaje:mensaje, fecha: new Date()});
    }catch(error){
      console.error('No se pudo guardar el mensaje. Error:', error);
    }
  }


  obtenerMensajes(): Observable<any[]> {
    let c = collection(this.firestore, 'chats');
    const q = query(c, orderBy('fecha', 'asc'));
    return collectionData(q);
  }
}
