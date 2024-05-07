import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatroom',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatroom.component.html',
  styleUrl: './chatroom.component.css'
})


export class ChatroomComponent implements OnInit {
  mensaje = '';
  messages: any[] = [];

  constructor(
    private chat: ChatService,
    public user: AuthService,
    private auth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit() {
    this.chat.obtenerMensajes().subscribe((doc) => {
      this.messages = doc;
    });
  }

  enviarMensaje() {
    this.chat.enviarMensaje(this.mensaje, this.user.userInfo.email);
    console.log(this.user.userInfo);
  }
}