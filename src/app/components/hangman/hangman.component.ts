import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hangman',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hangman.component.html',
  styleUrl: './hangman.component.css'
})
export class HangmanComponent{

    palabras: string[] = ["WOOKIE", "REBELION", "ROBOT", "ALIANZA", "REPUBLICA", "IMPERIO", "GALAXIA", "PLANETA"];
    palabraSeleccionada: string = '';
    letrasDisponibles: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    letrasSeleccionadas: Set<string> = new Set();
    letrasAdivinadas: boolean[] = [];
    intentos: number = 0;
    partesCuerpo: boolean[] = [false, false, false, false, false, false, false];
    resultado: boolean | null = null; //t si gana, f si pierde, nada si continua
  
    constructor() {
      this.iniciarJuego();
    }
  
    iniciarJuego(): void {
      this.palabraSeleccionada = this.palabras[Math.floor(Math.random() * this.palabras.length)];
      this.letrasSeleccionadas.clear();
      this.letrasAdivinadas = Array(this.palabraSeleccionada.length).fill(false);
      this.intentos = 0;
      this.partesCuerpo = [false, false, false, false, false, false, false];
      this.resultado = null;
    }

    seleccionarLetra(letra: string): void {
      if (!this.letrasSeleccionadas.has(letra)) {
        this.letrasSeleccionadas.add(letra);
        if (this.palabraSeleccionada.includes(letra)) {
          for (let i = 0; i < this.palabraSeleccionada.length; i++) {
            if (this.palabraSeleccionada[i] === letra) {
              this.letrasAdivinadas[i] = true;
            }
          }
          if (this.letrasAdivinadas.every(letra => letra)) {
            this.resultado = true; // Gana
          }
        } else {
          this.intentos++;
          this.partesCuerpo[this.intentos - 1] = true; // Le agrego uno para mostrar una parte más porque no se veía
          if (this.intentos >= this.partesCuerpo.length) {
            this.resultado = false; // Pierde
          }
        }
      }
    }
  
    getImageUrl(index: number): string {
      switch (index) {
        case 0: return 'assets/cabeza.png';
        case 1: return 'assets/torso.png';
        case 2: return 'assets/brazoIzquierdo.png';
        case 3: return 'assets/brazoDerecho.png';
        case 4: return 'assets/piernaIzquierda.png';
        case 5: return 'assets/piernaDerecha.png';
        case 6: return 'assets/ahorcado.png';
        default: return '';
      }
    }

    reiniciarJuego(): void {
      this.iniciarJuego();
    }
}