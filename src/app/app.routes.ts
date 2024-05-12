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
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutMeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'chatroom', component: ChatroomComponent },
    { path: 'hangman', component: HangmanComponent },
    { path: 'roulette', component: RouletteComponent },
    { path: 'greaterorlesser', component: GreaterorlesserComponent },
    { path: 'quizgame', component: QuizgameComponent },
    // { 
    //     path: 'hangman', 
    //     loadChildren: () => import('../../src/app/components/hangman/hangman.component').then(m => m.HangmanComponent)
    // },
    { path: '', redirectTo: '/login', pathMatch: "full" }, 
    { path: '**', component: PageNotFoundComponent }
];
