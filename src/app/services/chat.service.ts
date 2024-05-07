import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  itemsGuardar: any;

  constructor(public db: AngularFirestore) {
    this.itemsGuardar = db.collection('/chats');
  }


  obtenerMensajes(){
    return this.db.collection('chats', ref => ref.orderBy('hora')).valueChanges();
  }


  enviarMensaje(mensaje: string, user: string){
    this.itemsGuardar.add({
      mail : user,
      message : mensaje,
      dia : new Date().toLocaleDateString(),
      hora: new Date().toLocaleTimeString()
    });
  }
}
