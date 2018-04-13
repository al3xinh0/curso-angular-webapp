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

    constructor(
        private _productService: ProductService,
        private _route: ActivatedRoute,
        private _router: Router
    ){
        this.titulo = 'Agregar un nuevo producto';
        this.producto = new Product(0, '', '', '', '');
    }

    ngOnInit(){
        console.log('Componente para agregar cargado...');
    }

    agregarProducto(){
        console.log(this.producto);
        this._productService.insertProduct(this.producto).subscribe(
            result => {
                if (result.code == 200) {
                    this._router.navigate(['/products-list']);
                } else {
                    alert('No se guardaron los datos!');
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }
}