import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductService } from '../services/products.service';
import { Product } from '../models/product';
import { GLOBAL } from '../services/global';

@Component ({
    selector: 'product-edit',
    templateUrl: '../views/product-add.html',
    providers: [ProductService]
})

export class ProductEditComponent {
    private titulo: string;
    private esEdicion: boolean;
    private producto: Product;
    private filesToUpload;
    private resultUpload;

    constructor(
        private _productoServicio: ProductService,
        private _route: ActivatedRoute,
        private _router: Router
    ){
        this.producto = new Product(0, '', '', '', '');
        this.titulo = 'Editar Producto';
        this.esEdicion = true;
    }

    ngOnInit(){
        console.log('product-edit.component.ts CARGADO!');
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

    // FUNCION QUE ES LLAMADA DESDE EL BOTOON HTML
    agregarProducto(){
        console.log(this.producto);

        if (this.filesToUpload && this.filesToUpload.length >= 1) {
            // CARGAR IMAGENES
            this._productoServicio.uploadFiles(GLOBAL.url + 'subir-archivo', [], this.filesToUpload).then((result) => {
                console.log(result);
                this.resultUpload = result;
                this.producto.imagen = this.resultUpload.filename;
                this.actualizarProducto();
            }, (error) => {
                console.log(error);
            });
        } else {
            this.actualizarProducto();
        }
    }

    actualizarProducto(){
        // ACTUALIZA EL PRODUCTO EN LA BDD
        this._route.params.forEach((params: Params) => {
            let id = params['prod'];
            this._productoServicio.updateProduct(id, this.producto).subscribe(
                result => {
                    if (result.code == 200) {
                        this._router.navigate(['/product-detail/' + id]);
                    } else {
                        alert('No se actualizaron los datos!');
                    }
                },
                error => {
                    alert('No se actualizaron los datos!');
                    console.log(<any>error);
                }
            );
        });
    }

    subirArchivos(fileInput: any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
        console.log(this.filesToUpload);
    }
}