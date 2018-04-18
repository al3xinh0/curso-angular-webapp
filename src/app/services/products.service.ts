import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Product } from '../models/product';
import { GLOBAL } from './global';
import { reject } from 'q';

@Injectable()
export class ProductService {
    private url: string;

    constructor(
        private _http: Http
    ) {
        this.url = GLOBAL.url;
    }

    getProduct() {
        return this._http.get(this.url + 'productos').map(res => res.json());
    }

    getProductDetail(id) {
        return this._http.get(this.url + 'producto/' + id).map(res => res.json());
    }

    insertProduct(producto: Product) {
        let json = JSON.stringify(producto);
        let params = 'json=' + json;
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
        return this._http.post(this.url + 'productos', params, {headers: headers}).map(res => res.json());
    }

    uploadFiles(url: string, params: Array<string>, files: Array<File>){
        return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();

            for(var i = 0; i < files.length; i++){
                formData.append('uploads[]', files[i], files[i].name);
            }
            xhr.onreadystatechange = function(){
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            };
            xhr.open("POST", url, true);
            xhr.send(formData);
        });
    }

    updateProduct(id, producto: Product) {
        let json = JSON.stringify(producto);
        let params = 'json=' + json;
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
        return this._http.post(this.url + 'actualizar-producto/' + id , params, {headers: headers}).map(res => res.json());
    }

    deleteProduct(id) {
        return this._http.get(this.url + 'eliminar-producto/' + id).map(res => res.json());
    }
}