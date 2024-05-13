import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, Firestore, query, orderBy, limit, where, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Usuario } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public firestore: Firestore) { }

  agregarLogUsuarios(email : string) : void{
    try{
      let c = collection(this.firestore, 'logs');
      addDoc(c, { email: email, fecha: new Date()});
    }catch(error){
      console.error('No se pudo agregar el log. Error: ', error);
    }
  }

  agregarPuntaje(email : string, puntaje : number) : void{
    try{
      let c = collection(this.firestore, 'puntajes');
      addDoc(c, { email: email, puntos: puntaje});
    }catch(error){
      console.error('No se pudo agregar el log. Error: ', error);
    }
  }
}
