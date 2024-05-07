import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hangman',
  standalone: true,
  imports: [],
  templateUrl: './hangman.component.html',
  styleUrl: './hangman.component.css'
})
export class HangmanComponent implements OnInit{

  private bodyColor    = 'Pink' ;
  private gallowsColor = 'black' ;
  private nooseColor   = 'Peru' ;

  private canvasGallows! : HTMLCanvasElement ;
  private canvasHangman! : HTMLCanvasElement ;

  constructor() { }

  ngOnInit() {
    // Inicio el canvas y lo retorno
    const initCanvas = (id : string) : HTMLCanvasElement => {
      const canvas = <HTMLCanvasElement>document.getElementById(id) ;
      if (canvas) {
        const positionInfo = canvas.getBoundingClientRect() ;
        if (positionInfo) {
          canvas.height = positionInfo.height ;
          canvas.width  = positionInfo.width ;
        }
      }
      return canvas;
    } ;

    // Inicializo
    this.canvasGallows = initCanvas('gallows') ;
    this.canvasHangman = initCanvas('hangman') ;

    this.drawGallows() ;    // Troncos
    this.drawSmiley() ;     // Carita
  }

  private drawSmiley() {
    const canvas = this.canvasHangman;
    if (canvas) {
      const context = canvas.getContext('2d') ;
      const centerX = canvas.width  >> 1 ;    // Medio del dibujo
      const centerY = canvas.height >> 1 ;    // Centro de la cabeza
      const radius  = canvas.height  / 5 ;
      const eyeRadius  = canvas.height >> 6 ;
      const eyeXOffset = canvas.height >> 4 ;

      if (context) {
        context.lineWidth = 5 ;
        context.strokeStyle = this.bodyColor ;
        context.fillStyle = this.bodyColor ;

        //Dibujo circulo de la cabeza
        context.beginPath() ;
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false) ;
        context.stroke() ;

        // Dibujo ojos
        context.beginPath() ;
        const eyeXL = centerX - eyeXOffset ;
        const eyeXR = centerX + eyeXOffset ;
        const eyeY  = centerY - eyeXOffset ;
        context.arc(eyeXL, eyeY, eyeRadius, 0, 2 * Math.PI, false) ;
        context.arc(eyeXR, eyeY, eyeRadius, 0, 2 * Math.PI, false) ;
        context.fill() ;

        // Dibujo sonrisa
        context.beginPath() ;
        context.arc(centerX, centerY, radius / 1.5, 0, Math.PI, false) ;
        context.stroke() ;
      }
    }
  }

  private drawGallows() {
    const canvas = this.canvasGallows;
    if (canvas) {
      const context = canvas.getContext('2d') ;
      const lineWidth = 12 ;
      const halfWidth = lineWidth >> 1 ;

      if (context) {
        context.lineWidth = lineWidth ;
        context.strokeStyle = this.gallowsColor ;

        context.beginPath() ;

        // Dibujo el cuadrado
        context.moveTo(halfWidth, halfWidth) ;
        context.lineTo(canvas.width - halfWidth, halfWidth) ;
        context.lineTo(canvas.width - halfWidth, canvas.height - halfWidth) ;
        context.lineTo(halfWidth, canvas.height - halfWidth) ;
        context.lineTo(halfWidth, 0) ;

        // Dibujo los agregados
        context.moveTo(halfWidth, canvas.height / 3) ;
        context.lineTo(canvas.height / 3, halfWidth) ;
        context.moveTo(canvas.width - canvas.height / 3, halfWidth) ;
        context.lineTo(canvas.width - halfWidth, canvas.height / 3) ;

        context.stroke() ;
      }
    }
  }

  private drawNoose() {
    const canvas = this.canvasHangman ;
    if (canvas) {
      const context = canvas.getContext('2d') ;

      if (context) {
        context.lineWidth = 6 ;
        context.strokeStyle = this.nooseColor ;

        context.beginPath() ;
        context.moveTo(canvas.width >> 1, 0) ;
        context.lineTo(canvas.width >> 1, canvas.height / 6) ;
        context.stroke() ;
      }
    }
  }

  // Configuro como un callback
  drawBody = (parts = 0) : void => {
    const canvas = this.canvasHangman;
    if (canvas) {
      const context = canvas.getContext('2d') ;

      if (context) {
        // Borro todo
        context.clearRect(0, 0, canvas.width, canvas.height) ;

        // Si no tengo mas cuerpo, lo ahorco.
        (0 === parts) ? this.drawSmiley() : this.drawNoose() ;

        context.lineWidth = 5 ;
        context.strokeStyle = this.bodyColor ;

        // Dibujo partes del cuerpo
        const radius   = canvas.height / 12 ;
        const diameter = canvas.height / 6 ;
        const bodyCenterX = canvas.width >> 1 ;
        const headCenterY = radius + diameter ;

        if (0 < parts) {
          // Bibujo cabeza
          context.beginPath() ;
          context.arc(bodyCenterX, headCenterY, radius, 0, 2 * Math.PI, false) ;
          context.stroke() ;
        }

        if (1 < parts) {
          context.beginPath() ;

          // Dibuja el cuerpo
          context.moveTo(bodyCenterX, diameter << 1) ;
          context.lineTo(bodyCenterX, diameter << 2) ;
        }

        if (2 < parts) {
          // Dibuja una pierna
          context.lineTo(bodyCenterX + diameter, diameter * 5) ;
        }

        if (3 < parts) {
          // Dibuja otra pierna
          context.moveTo(bodyCenterX, diameter << 2) ;
          context.lineTo(bodyCenterX - diameter, diameter * 5) ;
        }

        if (4 < parts) {
          // Dibuja un brazo
          context.moveTo(bodyCenterX, diameter * 2.5) ;
          context.lineTo(bodyCenterX + radius * 2, diameter << 1) ;
        }

        if (5 < parts) {
          // Dibuja otro brazo
          context.moveTo(bodyCenterX, diameter * 2.5) ;
          context.lineTo(bodyCenterX - radius * 2, diameter << 1) ;
        }

        if (0 < parts) {
          context.stroke() ;
        }
      }
    }
  }
}