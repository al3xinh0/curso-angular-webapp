import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { ProductService } from '../services/products.service';
import { Product } from '../models/product';

declare var jQuery:any;
declare var $:any;

@Component ({
    selector: 'products-list',
    templateUrl: '../views/products-list.html',
    providers: [ProductService]
})

export class ProductsListComponent {
    private titulo: string;
    private productos: Product[];
    private confirmado;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _productService: ProductService
    ) {
        this.titulo = 'Lista de Productos';
        this.confirmado = null;
    }

    ngOnInit(): void {
        console.log('products-list.component.ts CARGADO!');
        this.obtenerProductos();
    }

    confirmarEliminacion(id) {
        this.confirmado = id;
    }

    cancelarEliminacion(){
        this.confirmado = null;
        this.mostrarSeccionHijo();
    }

    eliminarProducto(id) {
        this._productService.deleteProduct(id).subscribe(
            response => {
                if (response.code == 200) {
                    this.obtenerProductos();
                } else {
                    alert('Error al borrar producto');
                }
            },
            error => {
                console.log(<any>error);
            }
        )
    }

    obtenerProductos() {
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

    mostrarSeccion() {
        console.log('CLICK');
        $('.botonesAccion').slideToggle();
    }

    mostrarSeccionHijo() {
        console.log('CLICK');
        $('.botonesConfirmar').slideToggle();
    }
}