import { Component } from '@angular/core';

@Component ({
    selector: 'home',
    templateUrl: '../views/home.html'
})

export class HomeComponent {
    private titulo:string;

    constructor() {
        this.titulo = 'Bienvenido a WebApp con Angular';
    }

    ngOnInit() {
        console.log('Se ha cargado el componente');
    }
}