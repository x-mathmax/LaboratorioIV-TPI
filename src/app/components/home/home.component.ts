import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from '../../services/connection.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  currentUser : string;

  constructor(private router: Router, private connectionService: ConnectionService){
    this.currentUser = '';
  }

  ngOnInit(): void {
    this.currentUser = this.connectionService.getItem('username');
  }

  goAboutMe():void {
    this.router.navigate(['/about']);
  }

  logout():void {
    this.router.navigate(['/login']);
  }

  goHangman():void {
    this.router.navigate(['/hangman']);
  }

}
