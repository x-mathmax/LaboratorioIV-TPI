import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectionService } from '../../services/connection.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roulette',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './roulette.component.html',
  styleUrl: './roulette.component.css'
})
export class RouletteComponent {
  currentUser : string;
  options: string[] = ['Suma 0 puntos :C', 'Suma 10 puntos', 'Suma 20 puntos', 'Suma 30 puntos', 'Suma 40 puntos',
  'Suma 50 puntos', 'Seguí participando', 'Suma 20 puntos'];
  spinning: boolean = false;
  rotation: number = 0;

  constructor(private router: Router, private connectionService : ConnectionService){
    this.currentUser = '';
  }

  girarRuleta() {
    if (!this.spinning) {
      this.spinning = true;
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * this.options.length);
        this.spinning = false;
        setTimeout(() => {
          this.connectionService.executePopUp('La ruleta se detuvo en: ' + this.options[randomIndex]);
        });
      }, 3000);
    }
  }
}