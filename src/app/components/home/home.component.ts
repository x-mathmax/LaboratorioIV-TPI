import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router: Router){}

  goAboutMe():void {
    this.router.navigate(['/about']);
  }

  logout():void {
    this.router.navigate(['/login']);
  }

}
