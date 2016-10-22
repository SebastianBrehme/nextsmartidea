import { Component } from '@angular/core';


@Component({
    selector: 'my-app',
    template: `
    <h1>{{title}}</h1>
    <button (click)="doLogin()">Login</button>
    `
  })
export class AppComponent {
    title = 'Smart Event Login';
    
    doLogin():void{

    }
 }
