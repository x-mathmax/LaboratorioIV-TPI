import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiswService {

  http = inject(HttpClient);

  constructor() { }

  getPersonajes(): Observable<any> {
    return this.http.get<any[]>('https://akabab.github.io/starwars-api/api/all.json');
  }
}
