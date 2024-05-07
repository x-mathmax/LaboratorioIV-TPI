import { Component, OnInit } from '@angular/core';
import { Observable, Subject, fromEvent, merge } from 'rxjs';
import { debounceTime, filter, map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teclado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teclado.component.html',
  styleUrl: './teclado.component.css'
})
export class TecladoComponent implements OnInit {

  //Teclado
  private upperKeys : Array<string> = 'QWERTYUIOP'.split('') ;
  private innerKeys : Array<string> = 'ASDFGHJKL'.split('') ;
  private lowerKeys : Array<string> = 'ZXCVBNM'.split('') ;
  readonly rowsOfKeys : Array<Array<string>> = [this.upperKeys, this.innerKeys, this.lowerKeys] ;

  // Letras utilizadas en juego
  private usedKeySet : Set<string> = new Set<string>() ;

  // Input de teclado en pantalla
  public virtualKeySubject = new Subject<string>() ;
  public virtualKeyObservable = this.virtualKeySubject.asObservable() ;

  // Input de eventos de teclado
  private actualKeyObservable : Observable<string> ;

  constructor() {

    // Validador de letras
    const isLetterAtoZ = (letter : string) : boolean => {
      return ('A'.charCodeAt(0) <= letter.charCodeAt(0))
          && ('Z'.charCodeAt(0) >= letter.charCodeAt(0)) ;
    } ;

    this.actualKeyObservable = fromEvent(document.body, 'keyup')
      .pipe(
        // @ts-ignore
        map((e : KeyboardEvent) => typeof(e.key) !== 'undefined' ? e.key : String.fromCharCode(e.keyCode)),
        map((text : string)  => text.toUpperCase()),
        filter((text : string) => 1 === text.length),
        filter((letter : string) => isLetterAtoZ(letter)),
        debounceTime(100)
      ) ;
  }

  ngOnInit() {
    // test
    this.consumeLetters((letter : string) => console.log(`Consume : ${letter}`));

    // Guardo las ya utilizadas
    this.consumeLetters((letter : string) => this.usedKeySet.add(letter)) ;
  }

  // Devuelvo ok si ya fue utilizada
  isKeyUsed(letter : string) : boolean {
    return this.usedKeySet.has(letter) ;
  }

  // Reseteo teclado a cero
  resetKeyboard = () : void => {
    this.usedKeySet.clear() ;
  }

  // Paso una función que consume letras
  consumeLetters(consumer : (letter : string) => any) : void {

    // Combino dos observables como uno y me subscribo.-
    merge(this.actualKeyObservable, this.virtualKeyObservable).subscribe(consumer) ;
  }
}