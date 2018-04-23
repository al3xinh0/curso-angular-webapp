import { Component } from '@angular/core';
import { GLOBAL } from './services/global';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Productos Angular';
  private headerColor: string;
  constructor() {
    this.headerColor = GLOBAL.headerColor;
  }

  public mostrarSeccion() {
    console.log('CLICK');
    $('.botonesConfirmar').slideToggle();
  }
}
