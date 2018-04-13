import { Component } from '@angular/core';

@Component ({
    selector: 'error',
    templateUrl: '../views/error.html'
})

export class ErrorComponent {
    private titulo:string;

    constructor() {
        this.titulo = 'No se encuentra la página en WebApp con Angular';
    }

    ngOnInit() {
        console.log('Error, página no encontrada');
    }
}