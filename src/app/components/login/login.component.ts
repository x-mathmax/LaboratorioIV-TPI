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


//this.executePopUp("Login fallido. Por favor, reintente.");)
//

  // ngOnInit(): void {
  //   this.connectionService.setUserAndPassTest(this.username, this.password);
  // }

  // login(): void {
  //   const storedUsername = this.connectionService.getItem('username');
  //   const storedPassword = this.connectionService.getItem('password');

  //   if (storedUsername === this.username && storedPassword === this.password) {
  //     console.log('Login exitoso');
  //     this.router.navigate(['/home']);
  //   } else {
  //     console.log('Login fallido');
  //     this.executePopUp("Login fallido. Por favor, reintente.");
  //   }
  // }


  // executePopUp(mensaje : string):void {
  //   Swal.fire({
  //     title: mensaje,
  //     width: 600,
  //     padding: "3em",
  //     color: "#EFC206",
  //     background: "#fff url(/assets/SWBackground.jpg)",
  //     backdrop: `
  //       rgba(0,0,0,0.6)
  //     `,
  //     customClass: {
  //       confirmButton: 'custom-confirm-button-class'
  //     },
  //     confirmButtonColor: '#EFC206',
  //     confirmButtonText: 'Aceptar'
  //   });
  // }

  userDataLoading():void {
    this.username = 'barbaram@gmail.com';
    this.password =  'root1234';
  }

  goRegister():void {
    this.router.navigate(['/register']);
  }
}
