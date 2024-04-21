import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor() { }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  setUserAndPassTest(): void {
    localStorage.setItem('username', JSON.stringify('barbaram@gmail.com'));
    localStorage.setItem('password', JSON.stringify('root1234'));
  }
}
