import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductService } from '../services/products.service';
import { Product } from '../models/product';

@Component ({
    selector: 'product-add',
    templateUrl: '../views/product-add.html',
    providers: [ProductService]
})

export class ProductAddComponent{
    private titulo: string;
    private producto: Product;

    constructor(){
        this.titulo = 'Agregar un nuevo producto';
        this.producto = new Product(0, '', '', '', '');
    }

    ngOnInit(){
        console.log('Componente para agregar cargado...');
    }

    agregarProducto(){
        console.log(this.producto);
    }
}