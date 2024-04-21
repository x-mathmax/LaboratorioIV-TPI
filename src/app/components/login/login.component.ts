import { Component } from '@angular/core';
import { ConnectionService } from '../../services/connection.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string;
  password: string;
  //loginSuccessful: boolean = false;

  constructor(private connectionService: ConnectionService, private router: Router) { 
    this.username = '';
    this.password = '';
  }

  ngOnInit(): void {
    this.connectionService.setUserAndPassTest();
  }

  login(): void {
    const storedUsername = this.connectionService.getItem('username');
    const storedPassword = this.connectionService.getItem('password');

    if (storedUsername === this.username && storedPassword === this.password) {
      console.log('Login exitoso');
      this.router.navigate(['/home']);
    } else {
      console.log('Login fallido');
      this.executePopUp();
    }
  }

  executePopUp():void {
    Swal.fire({
      title: "Login fallido. Por favor, reintente.",
      width: 600,
      padding: "3em",
      color: "#EFC206",
      background: "#fff url(/assets/SWBackground.jpg)",
      backdrop: `
        rgba(0,0,0,0.6)
      `,
      customClass: {
        confirmButton: 'custom-confirm-button-class'
      },
      confirmButtonColor: '#EFC206',
      confirmButtonText: 'Aceptar'
    });
  }

  userDataLoading():void {
    this.username = 'barbaram@gmail.com';
    this.password =  'root1234';
  }
}
