import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { ConnectionService } from '../../services/connection.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  newUserMail: string = "";
  newUserPWD: string = "";

  loggedUser: string = "";
  flagError: boolean = false;
  msjError: string = "";

  constructor(private router: Router, public auth: Auth, private connectionService: ConnectionService){}

  goLogin():void {
    this.router.navigate(['/login']); }

  goHome():void {
    this.router.navigate(['/home']); }

  Register() { 
    createUserWithEmailAndPassword(this.auth, this.newUserMail, this.newUserPWD).then((res) => {
      if (res.user.email !== null) this.loggedUser = res.user.email;
      this.connectionService.setUserAndPassTest(this.loggedUser, '');
      this.flagError = false;
      this.goHome();

    }).catch((e) => {
      this.flagError = true;

      switch (e.code) {
        case "auth/invalid-email":
          this.connectionService.executePopUp("El email ingresado es inválido.");
          break;
        case "auth/email-already-in-use":
          this.connectionService.executePopUp("El email ingresado ya se encuentra registrado.");
          break;
        default:
          this.msjError = e.code
          break;
      }
    });
  }
}
