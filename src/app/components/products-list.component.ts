import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { ProductService } from '../services/products.service';
import { Product } from '../models/product';

@Component ({
    selector: 'products-list',
    templateUrl: '../views/products-list.html',
    providers: [ProductService]
})

export class ProductsListComponent {
    private titulo: string;
    private productos: Product[];

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _productService: ProductService
    ) {
        this.titulo = 'Lista de Productos';
    }

    ngOnInit(): void {
        console.log('products-list.component.ts CARGADO!');
        this._productService.getProduct().subscribe(
            result => {
                if (result.code != 200) {
                    console.log(<any>result);
                } else {
                    this.productos = result.data;
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }
}