import { CommonModule} from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ApiswService } from '../../services/apisw.service';

interface ButtonState {
  option: string;
  backgroundColor: string;
}

@Component({
  selector: 'app-quizgame',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizgame.component.html',
  styleUrl: './quizgame.component.css'
})
export class QuizgameComponent implements OnInit {

  characters!: any[]; 
  currentCharacter: any; 
  options!: string[]; 
  selectedOption!: string; 
  correctAnswer!: string; 
  puntos: number = 0;
  buttonStates: ButtonState[] = [];
  
    constructor(private apiService: ApiswService) {}
  
    ngOnInit(): void {
      this.obtenerDatos();
      
    }
  
    obtenerDatos(): void {
      this.apiService.getPersonajes().subscribe(data => {
        this.characters = data;
        this.newQuestion();
        this.initializeButtonStates();
      });
    }

    initializeButtonStates(): void {
      this.buttonStates = this.options.map(option => {
        return { option: option, backgroundColor: '' };
      });
    }

    newQuestion(): void {
      this.currentCharacter = this.characters[Math.floor(Math.random() * this.characters.length)];
      this.correctAnswer = this.currentCharacter.name;
    
      // Genero las distintas opciones de respuesta agregando la correcta y las no, y las mezclo
      this.options = [];
      this.options.push(this.correctAnswer);
      while (this.options.length < 4) {
        const randomCharacter = this.characters[Math.floor(Math.random() * this.characters.length)].name;
        if (!this.options.includes(randomCharacter)) {
          this.options.push(randomCharacter);
        }
      }
      this.shuffleArray(this.options);
    }
  
    checkAnswer(option: string): void {
      this.selectedOption = option;
      this.updateButtonStates();
      if (this.selectedOption === this.correctAnswer) {
        this.puntos++;
      }
    }

    updateButtonStates(): void {
      let selectedButtonIndex = -1;
      this.buttonStates.forEach((buttonState, index) => {
        if (buttonState.option === this.selectedOption) {
          selectedButtonIndex = index;
          buttonState.backgroundColor = buttonState.option === this.correctAnswer ? 'green' : 'red';
        } else {
          buttonState.backgroundColor = '';
        }
      });
    
      // Valido que color tiene que ir depende de que salio
      if (selectedButtonIndex !== -1) {
        this.buttonStates.forEach((buttonState, index) => {
          if (index !== selectedButtonIndex) {
            buttonState.backgroundColor = buttonState.option === this.correctAnswer ? 'green' : 'red';
          }
        });
      }
    }
    
    shuffleArray(array: any[]): void {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    nextButton() : void {
        this.newQuestion();
        this.initializeButtonStates();
    }
  }
