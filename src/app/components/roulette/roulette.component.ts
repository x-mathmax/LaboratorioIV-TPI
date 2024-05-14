import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectionService } from '../../services/connection.service';
import { Router } from '@angular/router';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-roulette',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './roulette.component.html',
  styleUrl: './roulette.component.css'
})
export class RouletteComponent {
  puntosAcumulados : number = 0;
  currentUser : string;

  options: { text: string, points: number }[] = [
    { text: 'Suma 0 puntos :C', points: 0 },
    { text: 'Suma 10 puntos', points: 10 },
    { text: 'Suma 20 puntos', points: 20 },
    { text: 'Suma 30 puntos', points: 30 },
    { text: 'Suma 40 puntos', points: 40 },
    { text: 'Suma 50 puntos', points: 50 },
    { text: 'Seguí participando', points: 0 },
    { text: 'Suma 20 puntos', points: 20 }
];
  spinning: boolean = false;
  rotation: number = 0;

  constructor(private router: Router, private connectionService : ConnectionService, private firestoreService : FirestoreService){
    this.currentUser = '';
  }

  ngOnInit(): void {
    this.currentUser = this.connectionService.getItem('username');
  }


  girarRuleta() {
    if (!this.spinning) {
      this.spinning = true;
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * this.options.length);
        this.spinning = false;
        const selectedOption = this.options[randomIndex];
        setTimeout(() => {
          this.connectionService.executePopUp('La ruleta se detuvo en: ' + selectedOption.text);
          this.puntosAcumulados += selectedOption.points;
        });
      }, 3000);
    }
  }

  goHome():void {
    if (this.puntosAcumulados != 0) {
      this.firestoreService.agregarPuntaje(this.currentUser, this.puntosAcumulados);
    }
    this.router.navigate(['/home']);
  }
}