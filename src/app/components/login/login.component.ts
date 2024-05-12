import { Component } from '@angular/core';
import { ConnectionService } from '../../services/connection.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string;
  password: string;

  constructor(private connectionService: ConnectionService, private router: Router, public auth: Auth) { 
    this.username = '';
    this.password = '';
  }

  Login() {
    signInWithEmailAndPassword(this.auth, this.username, this.password).then((res) => {
      if (res.user.email !== null) {
        this.username = res.user.email;
        this.connectionService.setUserAndPassTest(this.username, '');
        this.router.navigate(['/home']);
      } 
      
    }).catch((e) => {
      console.log(e);
      this.connectionService.executePopUp("Login fallido. Por favor, reintente.");
    });
    
  }

  userDataLoading():void {
    this.username = 'barbaram@gmail.com';
    this.password =  'root1234';
  }

  goRegister():void {
    this.router.navigate(['/register']);
  }
}
