import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { ChatService } from '../../services/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ConnectionService } from '../../services/connection.service';


@Component({
  selector: 'app-chatroom',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatroom.component.html',
  styleUrl: './chatroom.component.css'
})


export class ChatroomComponent implements OnInit {
  nuevoMensaje = '';
  mensajes!: Observable<any[]>;
  usuarioLog! : string;

  constructor(
    private chat: ChatService,
    private auth: Auth,
    private router: Router,
    private connectionService: ConnectionService
  ) {}

  ngOnInit() {
    this.mensajes = this.chat.obtenerMensajes();
    const user = this.auth.currentUser;
    if (user) {
      this.usuarioLog = user.displayName || this.connectionService.getItem('username');
    } else if (user == null || user == '') {
      this.connectionService.executePopUp("El chatroom esta disponible solo para usuarios.");
      this.goLogin();
    }
}

  esMensajePropio(emisor: string): boolean {
    return emisor === this.usuarioLog;
  }

  enviarMensaje(): void {
    if (this.nuevoMensaje.trim() !== '') {
      this.chat.agregarMensaje(this.usuarioLog, this.nuevoMensaje);
      this.nuevoMensaje = '';
    }
  }

goHome():void {
  this.router.navigate(['/home']);
}

goLogin():void {
  this.router.navigate(['/login']);
}
}