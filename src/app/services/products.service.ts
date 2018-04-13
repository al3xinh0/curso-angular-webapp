import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Product } from '../models/product';
import { GLOBAL } from './global';

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

    insertProduct(producto: Product) {
        let json = JSON.stringify(producto);
        let params = 'json=' + json;
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
        return this._http.post(this.url + 'productos', params, {headers: headers}).map(res => res.json());
    }
}