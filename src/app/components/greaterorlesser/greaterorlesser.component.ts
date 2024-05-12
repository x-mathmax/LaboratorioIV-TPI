import { Component, OnInit} from '@angular/core';
import { ConnectionService } from '../../services/connection.service';
import { Router } from '@angular/router';

interface Carta {
  valor: number;
  imagenUrl: string;
}

@Component({
  selector: 'app-greaterorlesser',
  standalone: true,
  imports: [],
  templateUrl: './greaterorlesser.component.html',
  styleUrl: './greaterorlesser.component.css'
})
export class GreaterorlesserComponent implements OnInit {
  currentUser : string;
  cartas: Carta[] = [
    { valor: 1, imagenUrl: 'assets/unoCarta.png' },
    { valor: 2, imagenUrl: 'assets/dosCarta.png' },
    { valor: 3, imagenUrl: 'assets/tresCarta.png' },
    { valor: 4, imagenUrl: 'assets/cuatroCarta.png' },
    { valor: 5, imagenUrl: 'assets/cincoCarta.png' },
    { valor: 6, imagenUrl: 'assets/seisCarta.png' },
    { valor: 7, imagenUrl: 'assets/sieteCarta.png' },
    { valor: 8, imagenUrl: 'assets/ochoCarta.png' },
    { valor: 9, imagenUrl: 'assets/nueveCarta.png' },
    { valor: 10, imagenUrl: 'assets/diezCarta.png' },
    { valor: 11, imagenUrl: 'assets/onceCarta.png' },
    { valor: 12, imagenUrl: 'assets/doceCarta.png' },
    { valor: 13, imagenUrl: 'assets/treceCarta.png' },
    { valor: 14, imagenUrl: 'assets/catorceCarta.png' },
    { valor: 15, imagenUrl: 'assets/quinceCarta.png' },
    { valor: 16, imagenUrl: 'assets/dieciseisCarta.png' },
    { valor: 17, imagenUrl: 'assets/diecisieteCarta.png' },
    { valor: 18, imagenUrl: 'assets/dieciochoCarta.png' },
    { valor: 19, imagenUrl: 'assets/diecinueveCarta.png' },  
    { valor: 20, imagenUrl: 'assets/veinteCarta.png' }
  ];
  cartaActual: Carta = { valor: 0, imagenUrl: '' };
  siguienteCarta: Carta = { valor: 0, imagenUrl: '' };
  puntos: number = 0;
  cartasMostradas: Set<number> = new Set();

  constructor(private router: Router, private connectionService : ConnectionService){
    this.currentUser = '';
  }

  ngOnInit(): void {
    this.barajarCartas();
    this.mostrarSiguienteCarta();
  }

  barajarCartas(): void {
    this.cartas = this.shuffle(this.cartas);
  }

  shuffle(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  mostrarSiguienteCarta(): void {
    if (this.cartas.length === 0) {
      this.connectionService.executePopUp('El juego ha finalizado. Su puntaje final es ' + this.puntos);
      return;
    }
    this.cartaActual = this.cartas.shift()!;
    this.cartasMostradas.add(this.cartaActual.valor);
    if (this.cartas.length > 0) {
      this.siguienteCarta = this.cartas[0];
    }
  }

  eleccionMayor(): void {
    if (this.siguienteCarta.valor > this.cartaActual.valor) {
      this.puntos++;
    }
    this.mostrarSiguienteCarta();
  }

  eleccionMenor(): void {
    if (this.siguienteCarta.valor < this.cartaActual.valor) {
      this.puntos++;
    }
    this.mostrarSiguienteCarta();
  }
}