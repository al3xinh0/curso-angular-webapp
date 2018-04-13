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
}