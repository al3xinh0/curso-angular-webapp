import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductService } from '../services/products.service';
import { Product } from '../models/product';
import { GLOBAL } from '../services/global';

@Component ({
    selector: 'product-detail',
    templateUrl: '../views/product-detail.html',
    providers: [ProductService]
})

export class ProductDetailComponent {
    public producto: Product;

    constructor(
        private _productoServicio: ProductService,
        private _route: ActivatedRoute,
        private _router: Router
    ){}

    ngOnInit(){
        console.log('product-detail.component.ts CARGADO!');
        this.getProductDetail();
    }

    getProductDetail() {
        this._route.params.forEach((params: Params) => {
            let id = params['prod'];
            console.log(id);
            this._productoServicio.getProductDetail(id).subscribe(
                response => {
                    if (response.code == 200) {
                        this.producto = response.data;
                    } else {
                        this._router.navigate(['/productos']);
                    }
                },
                error => {
                    console.log(<any>error);
                }
                
            );
        });
    }
}
