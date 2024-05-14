import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { RegisterComponent } from './components/register/register.component';
import { ChatroomComponent } from './components/chatroom/chatroom.component';
import { HangmanComponent } from './components/hangman/hangman.component';
import { RouletteComponent } from './components/roulette/roulette.component';
import { GreaterorlesserComponent } from './components/greaterorlesser/greaterorlesser.component';
import { QuizgameComponent } from './components/quizgame/quizgame.component';


export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: "full" },
    { path: 'login',
    loadComponent: () => import('./components/login/login.component').then(c => c.LoginComponent) },
    { path: 'home',
    loadComponent: () => import('./components/home/home.component').then(c => c.HomeComponent) },
    { path: 'about',
    loadComponent: () => import('./components/about-me/about-me.component').then(c => c.AboutMeComponent) },
    { path: 'register',
    loadComponent: () => import('./components/register/register.component').then(c => c.RegisterComponent) },
    { path: 'chatroom',
    loadComponent: () => import('./components/chatroom/chatroom.component').then(c => c.ChatroomComponent) },
    { path: 'hangman',
    loadComponent: () => import('./components/hangman/hangman.component').then(c => c.HangmanComponent) },
    { path: 'roulette',
    loadComponent: () => import('./components/roulette/roulette.component').then(c => c.RouletteComponent) },
    { path: 'greaterorlesser',
    loadComponent: () => import('./components/greaterorlesser/greaterorlesser.component').then(c => c.GreaterorlesserComponent) },
    { path: 'quizgame',
    loadComponent: () => import('./components/quizgame/quizgame.component').then(c => c.QuizgameComponent) },
    { path: '**',
    loadComponent: () => import('./components/page-not-found/page-not-found.component').then(c => c.PageNotFoundComponent) },
    //{ path: '**', component: PageNotFoundComponent }
];
