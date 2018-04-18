import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductService } from '../services/products.service';
import { Product } from '../models/product';
import { GLOBAL } from '../services/global';

@Component ({
    selector: 'product-add',
    templateUrl: '../views/product-add.html',
    providers: [ProductService]
})

export class ProductAddComponent{
    private titulo: string;
    private producto: Product;
    private filesToUpload;
    private resultUpload;

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

        if (this.filesToUpload && this.filesToUpload.length >= 1) {
            // CARGAR IMAGENES
            this._productService.uploadFiles(GLOBAL.url + 'subir-archivo', [], this.filesToUpload).then((result) => {
                console.log(result);
                this.resultUpload = result;
                console.log(this.resultUpload.filename);
                this.producto.imagen = this.resultUpload.filename;
                this.guardarProducto();                
            }, (error) => {
                console.log(error);
            });
        } else {
            this.producto.imagen = 'SIN-IMAGEN';
            this.guardarProducto();
        }
    }

    guardarProducto(){
        // INSERTA EL PRODUCTO EN LA BDD
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

    subirArchivos(fileInput: any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
        console.log(this.filesToUpload);
    }
}